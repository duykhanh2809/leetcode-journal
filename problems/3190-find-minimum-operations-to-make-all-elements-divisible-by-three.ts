// https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three/?envType=daily-question&envId=2025-11-22

function minimumOperations(nums: number[]): number {
    const numPass = nums.filter((i) => i % 3 === 0);
    return nums.length - numPass.length;
};
