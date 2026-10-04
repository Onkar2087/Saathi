import { Mastra } from "@mastra/core/mastra";
import { Observability } from "@mastra/observability";
import { SentryExporter } from "@mastra/sentry";
import { saathiAgent, scamAgent, storage } from "./agents";

const observability = process.env.SENTRY_DSN
  ? new Observability({
      configs: {
        sentry: {
          serviceName: "saathi",
          exporters: [
            new SentryExporter({
              dsn: process.env.SENTRY_DSN,
              environment: process.env.NODE_ENV,
              tracesSampleRate: 1.0,
            }),
          ],
        },
      },
    })
  : undefined;

function createMastra() {
  return new Mastra({
    agents: { saathiAgent, scamAgent },
    storage,
    observability,
  });
}

const globalForMastra = globalThis as unknown as { _saathiMastra?: ReturnType<typeof createMastra> };

export const mastra = globalForMastra._saathiMastra ?? createMastra();

if (process.env.NODE_ENV !== "production") globalForMastra._saathiMastra = mastra;
