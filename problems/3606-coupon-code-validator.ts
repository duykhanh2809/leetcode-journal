// 3606. Coupon Code Validator

function validateCoupons(
  code: string[],
  businessLine: string[],
  isActive: boolean[]
): string[] {
  const reShort = /^\w+$/;
  const validBusinessLines = [
    "electronics",
    "grocery",
    "pharmacy",
    "restaurant",
  ];

  const codePerBusinessLine = new Map<string, string[]>();
  validBusinessLines.forEach((bl) => codePerBusinessLine.set(bl, []));

  for (let idx = 0; idx < code.length; idx++) {
    const businessLineForCode = businessLine[idx];
    const isActiveForCode = isActive[idx];

    if (
      isActiveForCode &&
      validBusinessLines.includes(businessLineForCode) &&
      reShort.test(code[idx])
    ) {
      codePerBusinessLine.get(businessLineForCode).push(code[idx]);
    }
  }

  return validBusinessLines.flatMap((bl) =>
    codePerBusinessLine.get(bl)!.sort()
  );
}
