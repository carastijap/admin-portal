type ServerLogLevel = "info" | "warn" | "error";

function stringifyMeta(meta: unknown): string {
  if (meta === undefined) return "";

  if (typeof meta === "string") return meta;

  try {
    return JSON.stringify(meta, null, 2);
  } catch {
    return String(meta);
  }
}

function writeLog(level: ServerLogLevel, scope: string, message: string, meta?: unknown) {
  const prefix = `[server][${scope}][${level}]`;
  const serializedMeta = stringifyMeta(meta);
  const output = serializedMeta ? `${prefix} ${message}\n${serializedMeta}` : `${prefix} ${message}`;

  if (level === "info") {
    console.info(output);
    return;
  }

  if (level === "warn") {
    console.warn(output);
    return;
  }

  console.error(output);
}

export function createServerLogger(scope: string) {
  return {
    info(message: string, meta?: unknown) {
      writeLog("info", scope, message, meta);
    },
    warn(message: string, meta?: unknown) {
      writeLog("warn", scope, message, meta);
    },
    error(message: string, meta?: unknown) {
      writeLog("error", scope, message, meta);
    },
  };
}
