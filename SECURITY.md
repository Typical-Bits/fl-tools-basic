# Security

Maintainer: TypicalBits

Never commit tokens, credentials, cookies, private profile exports, or authenticated URLs. Store automation credentials in GitHub Actions secrets, with minimum required permissions. Use public, unauthenticated asset URLs for badge images.

Report security issues privately to TypicalBits through GitHub private vulnerability reporting where available. Do not put secrets into public issues or pull requests.

The secret-scan workflow checks reachable Git history with pinned Gitleaks and redacted output. A clean scan does not guarantee that all sensitive data has been detected.
