"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { LangMap } from "@/i18n/lang-map";

export function CodeExampleSection({
  example,
}: {
  example: LangMap["/resource-pool"]["example"];
}) {
  const [exampleType, setExampleType] = useState<"use" | "async" | "sync">(
    "use"
  );

  const codeExamples = {
    use: `import { GenericObjectPool } from '@lojhan/resource-pool'

// Create a pool with some resources
const dbConnections = [
  new Connection('db1'),
  new Connection('db2'),
  new Connection('db3')
]
const pool = new GenericObjectPool(dbConnections)

async function handleRequest() {
  try {
    // Use a resource - it's automatically released
    const result = await pool.use(async (connection) => {
      console.log(\`Using: \${connection.id}\`)
      return await connection.query('SELECT * FROM users')
    })

    console.log('Result:', result)
  } catch (err) {
    console.error('Operation failed:', err)
  }
}

handleRequest()`,

    async: `import { GenericObjectPool } from '@lojhan/resource-pool'

const pool = new GenericObjectPool([
  { id: 1 }, { id: 2 }, { id: 3 }
])

async function manualWork() {
  let resource
  try {
    // Acquire with a timeout (e.g., 5000ms)
    resource = await pool.acquireAsync(5000)

    // Do work with resource
    console.log('Processing with', resource.id)
    await processWork(resource)
  } catch (err) {
    if (err.message.includes('timeout')) {
      console.log('Timed out waiting for resource')
    } else {
      console.error('Error:', err)
    }
  } finally {
    // ALWAYS release the resource back
    if (resource) {
      pool.release(resource)
    }
  }
}`,

    sync: `import { GenericObjectPool } from '@lojhan/resource-pool'

const pool = new GenericObjectPool([
  { id: 1 }, { id: 2 }
])

try {
  // Synchronous acquire
  // Throws if empty
  const resource = pool.acquire()

  console.log('Got resource:', resource.id)
  
  // Use the resource
  processSync(resource)
  
  // Release it back
  pool.release(resource)
} catch (e) {
  console.log('No resources immediately available')
}`,
  };

  const typeLabels = {
    use: "use() - Recommended",
    async: "acquireAsync() - Manual",
    sync: "acquire() - Synchronous",
  };

  return (
    <div className="overflow-hidden rounded-lg border border-muted-foreground/20">
      <div className="bg-slate-900 px-6 py-3 border-b border-slate-700 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">
          {example.codeFileName}
        </span>
        <div className="flex gap-2">
          {(["use", "async", "sync"] as const).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setExampleType(type)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                exampleType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        customStyle={{
          padding: "1.5rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          backgroundColor: "#0d1117",
        }}
        wrapLines
      >
        {codeExamples[exampleType]}
      </SyntaxHighlighter>
    </div>
  );
}
