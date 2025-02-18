const plugin = {
  meta: {
    name: "eslint-plugin-no-wave-dash",
    version: "1.0.0",
  },
  rules: {
    "no-wave-dash": {
      create(context) {
        return {
          Literal(node) {
            if (node.value && typeof node.value === "string") {
              if (node.value.includes("〜")) {
                context.report({
                  node,
                  message: "Yahoo!広告スクリプトで'〜'は使えません。",
                });
              }
            }
          },
        };
      },
    },
  },
};

export default plugin;
