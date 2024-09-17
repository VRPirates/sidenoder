/**
 * This commitlint config file extends the conventional configuration
 * and adds the following customizations:
 *
 * - Ignores commit messages that start with "Merge"
 * - Allows the following commit types:
 *   - build
 *   - chore
 *   - ci
 *   - docs
 *   - feat
 *   - fix
 *   - perf
 *   - refactor
 *   - revert
 *   - style
 *   - test
 *   - Merge
 *
 * Please see the commitlint documentation for more information on how to use
 * this configuration file:
 * https://commitlint.js.org/reference/rules.html
 *
 */
const RuleConfigSeverity = {
  Disabled: 0,
  Warning: 1,
  Error: 2,
};

module.exports = {
  ignores: [(message) => message.startsWith("Merge")],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    "body-case": [RuleConfigSeverity.Disabled, "always"],
    "body-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "body-max-line-length": [RuleConfigSeverity.Disabled, "always"],
    "footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "footer-max-line-length": [RuleConfigSeverity.Disabled, "always"],
    "header-max-length": [RuleConfigSeverity.Disabled, "always"],
    "header-trim": [RuleConfigSeverity.Error, "always"],
    "scope-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "subject-case": [RuleConfigSeverity.Disabled, "always"],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
    "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "type-empty": [RuleConfigSeverity.Error, "never"],
  },
};
