# 🔥 OG Search

> search before the bots took over

A Firefox extension that automatically filters search results to pre-ChatGPT internet (before Nov 30, 2022). No more AI-generated content. Just real humans who actually know things.

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Download-FF7139?style=for-the-badge&logo=firefox-browser)](https://addons.mozilla.org/firefox/addon/og-search/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Support-Buy%20Coffee-yellow?style=for-the-badge)](https://buymeacoffee.com/ogsearchapp)

---

## the problem

Since ChatGPT launched in late 2022, AI-generated content has flooded the internet:

- 🤖 Fake product reviews
- 📝 Generic copy-paste tutorials
- 💬 Bot-written forum responses
- 🗞️ AI-generated articles everywhere

Finding authentic human content is actual work now.

## the solution

OG Search automatically filters your searches to before November 30, 2022.

**One click. Zero config. Pure human content.**

---

## ✨ features

- 🎯 **automatic filtering** - just search like normal
- ⚡ **7+ search engines** - Google, Reddit, GitHub, Stack Overflow, DuckDuckGo, Bing, Yahoo
- 🔒 **zero tracking** - we don't collect anything
- 💯 **free forever** - no premium BS
- 🪶 **lightweight** - won't slow you down
- 🔓 **open source** - check the code yourself

---

## 🚀 installation

### Firefox (stable)
1. [Download from Firefox Add-ons](https://addons.mozilla.org/firefox/addon/og-search/)
2. That's it. Start searching.

### Manual installation
1. Clone this repo
```bash
git clone https://github.com/kieracarman/og-search.git
cd og-search
```

2. Open Firefox and go to `about:debugging#/runtime/this-firefox`

3. Click "Load Temporary Add-on"

4. Select `manifest.json` from the repo folder

---

## 🎯 supported platforms

| Platform | Status | Notes |
|----------|--------|-------|
| Google | ✅ | Full support |
| Reddit | ✅ | Full support |
| GitHub | ✅ | Full support |
| Stack Overflow | ✅ | Full support |
| DuckDuckGo | ✅ | Full support |
| Bing | ✅ | Full support |
| Yahoo | ✅ | Full support |
| Twitter | 🔜 | Coming soon |
| YouTube | 🔜 | Coming soon |

---

## 🛠️ how it works

1. Extension intercepts search URLs
2. Adds date filter parameters specific to each platform
3. Redirects to filtered search results
4. Tracks your bot-free searches (locally only)

**Privacy**: All data stays on your device. We don't track, collect, or send anything.

---

## 📁 project structure

```
og-search/
├── manifest.json       # Extension config
├── background.js       # Core filtering logic
├── icons/              # Extension icons
│   ├── icon-48.png
│   └── icon-96.png
└── popup/
├── popup.html      # Extension UI
├── popup.css       # Styles
└── popup.js        # UI logic
```

---

## 🤝 contributing

contributions are welcome! here's how:

1. Fork the repo
2. Create a branch (`git checkout -b feature/cool-thing`)
3. Make your changes
4. Test thoroughly
5. Submit a PR

### ideas for contributions

- [ ] Add support for more search engines
- [ ] Custom date filtering
- [ ] Chrome/Edge port
- [ ] Keyboard shortcuts
- [ ] Dark mode for popup
- [ ] Search statistics dashboard

---

## 💭 faq

**Q: Why November 30, 2022?**  
A: That's when ChatGPT was released and AI content started flooding the internet.

**Q: Will this work forever?**  
A: As long as search engines maintain archives and allow date filtering, yes!

**Q: What about good AI content?**  
A: AI has its uses! This is just for when you specifically want human perspectives.

**Q: Can you add [search engine]?**  
A: Probably! Open an issue or submit a PR.

**Q: Chrome version when?**  
A: Working on it. Star the repo to show interest!

---

## 🐛 known issues

- DuckDuckGo date filtering is approximate (search engine limitation)
- Some niche search engines not yet supported
- Date filter may not work for image/video searches on some platforms

[Report a bug](https://github.com/kieracarman/og-search/issues)

---

## 📊 stats

![GitHub stars](https://img.shields.io/github/stars/kieracarman/og-search?style=social)
![GitHub forks](https://img.shields.io/github/forks/kieracarman/og-search?style=social)
![GitHub issues](https://img.shields.io/github/issues/kieracarman/og-search)

---

## 🙏 support

This extension is free forever. But if it's making your life better:

- ☕ [Buy me a coffee](https://buymeacoffee.com/ogsearchapp)
- ⭐ Star this repo
- 📢 Tell your friends
- 🐛 Report bugs
- 💡 Suggest features

---

## 📜 license

MIT License - see [LICENSE](LICENSE) for details

---

## 🔗 links

- [Website](https://ogsearch.app)
- [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/og-search/)
- [Buy Me a Coffee](https://buymeacoffee.com/ogsearchapp)

---

<p align="center">
  <strong>made by humans who miss the real internet</strong><br>
  before the bots took over 🔥
</p>
