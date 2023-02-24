import compose from "compose-function";

import { withStore } from "@app/providers/with-store";

export const withProviders = compose(withStore);
