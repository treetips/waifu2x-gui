export type Waifu2xBinaryPathType = Readonly<{
  key: string;
  value: string;
}>;

export const waifu2xBinaryPaths = [
  {
    key: "run-waifu2x-for-apple-silicon-macos",
    value: "/opt/homebrew/bin/waifu2x",
  } as const,
  {
    key: "run-waifu2x-for-intel-macos",
    value: "/usr/local/bin/waifu2x",
  } as const,
  {
    key: "run-waifu2x-for-linux",
    value: "/home/linuxbrew/.linuxbrew/bin/waifu2x",
  } as const,
] satisfies Waifu2xBinaryPathType[];
