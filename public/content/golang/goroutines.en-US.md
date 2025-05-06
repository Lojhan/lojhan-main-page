# Understanding Goroutines in Go

## What Are Goroutines?

Goroutines are one of Go's most distinctive features - lightweight threads of execution managed by the Go runtime rather than the operating system. They are a fundamental building block for concurrent programming in Go, allowing developers to write concurrent code that's both efficient and straightforward.

## Goroutines vs. Traditional Threads

Unlike traditional OS threads, goroutines are extremely lightweight:

- **Size**: Goroutines start with a small stack (2KB in recent versions), which can grow and shrink as needed. Traditional threads might require 1-2MB of memory.
- **Creation**: Creating thousands of goroutines is practical and efficient, while creating thousands of OS threads would quickly exhaust system resources.
- **Scheduling**: Goroutines are managed by Go's runtime scheduler, which multiplexes goroutines onto OS threads, rather than relying on the operating system scheduler.

## Basic Syntax

Creating a goroutine is remarkably simple - just add the `go` keyword before a function call:

```go
func main() {
    // Run sayHello concurrently
    go sayHello("world")

    // This continues executing immediately
    fmt.Println("Hello from main")

    // Sleep to give the goroutine time to execute
    time.Sleep(100 * time.Millisecond)
}

func sayHello(name string) {
    fmt.Println("Hello,", name)
}
```

## How Goroutines Work

Under the hood, the Go runtime maintains:

1. A **processor** (P) for each virtual CPU
2. An **OS thread** (M) for each processor
3. A **run queue** of goroutines for each processor
4. A **global run queue** for goroutines waiting to be assigned

The scheduler handles the multiplexing of many goroutines onto fewer OS threads, implementing work-stealing algorithms to balance loads efficiently.

## Communication Between Goroutines

Goroutines communicate via channels, implementing Go's philosophy of "Do not communicate by sharing memory; instead, share memory by communicating."

```go
func main() {
    messages := make(chan string)

    go func() {
        messages <- "ping"
    }()

    msg := <-messages
    fmt.Println(msg) // Output: ping
}
```

## Synchronization

For basic synchronization, Go provides the `sync` package:

```go
func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d done\n", id)
        }(i)
    }

    // Wait for all goroutines to finish
    wg.Wait()
    fmt.Println("All workers completed")
}
```

## Common Patterns and Best Practices

### Worker Pools

```go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Println("worker", id, "processing job", j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send 5 jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for a := 1; a <= 5; a++ {
        <-results
    }
}
```

### Limiting Concurrency

```go
func main() {
    urls := []string{/* list of URLs */}
    semaphore := make(chan struct{}, 10) // Limit to 10 concurrent requests

    for _, url := range urls {
        semaphore <- struct{}{} // Acquire token
        go func(url string) {
            defer func() { <-semaphore }() // Release token
            // Process URL
        }(url)
    }
}
```

## Common Pitfalls

### Goroutine Leaks

Goroutines that are never terminated consume resources. Always ensure goroutines can exit:

```go
func leak() {
    ch := make(chan int)
    go func() {
        val := <-ch // This goroutine will be blocked forever
        fmt.Println("Received:", val)
    }()
    // No value is ever sent to the channel
}
```

### Capturing Loop Variables

```go
// Incorrect
for i := 0; i < 5; i++ {
    go func() {
        fmt.Println(i) // Will likely print "5" five times
    }()
}

// Correct
for i := 0; i < 5; i++ {
    go func(val int) {
        fmt.Println(val) // Will print 0, 1, 2, 3, 4 in random order
    }(i)
}
```

## When to Use Goroutines

Goroutines are ideal for:

- I/O-bound operations (network requests, file operations)
- CPU-bound operations that can be parallelized
- Server handling multiple client connections
- Background tasks while maintaining UI responsiveness

## Real-World Examples

### Web Server

```go
func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
    // Each request is processed in its own goroutine
}
```

### Concurrent Data Processing

```go
func processData(data []Item) []Result {
    results := make([]Result, len(data))
    var wg sync.WaitGroup

    for i, item := range data {
        wg.Add(1)
        go func(i int, item Item) {
            defer wg.Done()
            results[i] = process(item)
        }(i, item)
    }

    wg.Wait()
    return results
}
```

Goroutines represent one of Go's most powerful features, enabling concurrent programming that's both efficient and relatively easy to reason about. By combining goroutines with channels and the sync package, Go developers can create highly concurrent applications without much of the complexity traditionally associated with multithreaded programming.

The lightweight nature of goroutines allows Go programs to scale to thousands or even millions of concurrent operations, making it particularly well-suited for modern networked applications and services.
