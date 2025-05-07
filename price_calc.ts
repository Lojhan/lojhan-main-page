function calculatePrice(plan: (number | number[])[]) {
  const multiplier = (plan.pop() as unknown as number) || 1;
  const price =
    multiplier *
    (plan as unknown as [number, number][]).reduce(
      (acc, price) => acc + price[0] * price[1],
      0
    );
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

function calculateHourlyRate(plan: (number | number[])[]) {
  // Make a copy of the plan to avoid modifying the original

  // Extract the multiplier (last element)
  const multiplier = (plan.pop() as unknown as number) || 1;

  // Calculate total price
  const totalPrice =
    multiplier *
    (plan as unknown as [number, number][]).reduce(
      (acc, price) => acc + price[0] * price[1],
      0
    );

  // Calculate total hours (sum of quantities)
  const totalHours = (plan as unknown as [number, number][]).reduce(
    (acc, price) => acc + price[1],
    0
  );

  // Calculate hourly rate
  const hourlyRate = totalPrice / totalHours;

  // Format and return the hourly rate
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(hourlyRate);
}

const prices_mentorship = {
  one_hour_call: 150,
  interview_prep: 150,
  resume_review: 150,
  mock_interview: 200,
};

const basic_montly_plan = [
  [prices_mentorship.one_hour_call, 3],
  [prices_mentorship.resume_review, 1],
  1.2,
];

const medium_montly_plan = [
  [prices_mentorship.one_hour_call, 4],
  [prices_mentorship.mock_interview, 1],
  [prices_mentorship.resume_review, 1],
  1.1,
];

const advanced_montly_plan = [
  [prices_mentorship.one_hour_call, 4],
  [prices_mentorship.interview_prep, 2],
  [prices_mentorship.mock_interview, 2],
  [prices_mentorship.resume_review, 1],
  1.1,
];

const basic_package_plan = [
  [prices_mentorship.one_hour_call, 10],
  [prices_mentorship.resume_review, 1],
  [prices_mentorship.mock_interview, 1],
  1.1,
];

const advanced_package_plan = [
  [prices_mentorship.one_hour_call, 20],
  [prices_mentorship.resume_review, 1],
  [prices_mentorship.mock_interview, 1],
  1.1,
];

const plans = [
  basic_montly_plan,
  medium_montly_plan,
  advanced_montly_plan,
  basic_package_plan,
  advanced_package_plan,
];

console.table({
  name: [
    "[MONTLY][BASIC]",
    "[MONTLY][MEDIUM]",
    "[MONTLY][ADVANCED]",

    "[PACKAGE][ADVANCED]",
    "[PACKAGE][ADVANCED]",
  ],
  price: plans.map((p) => calculatePrice([...p])),
  hourly_rate: plans.map((p) => calculateHourlyRate([...p])),
});

