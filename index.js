const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sourceFiles = [
  {
    urls: [
      { url: "https://adaway.org/hosts.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/SmartTV_ads.txt" },
      { url: "https://v.firebog.net/hosts/Easylist.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/Ad_filter_list_by_Disconnect.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/hostfile.txt" }, //updated in july 2024
      { url: "https://raw.githubusercontent.com/lightswitch05/hosts/refs/heads/master/docs/lists/ads-and-tracking-extended.txt" }, //archived
      { url: "https://o0.pages.dev/Pro/hosts.txt" },
      { url: "https://raw.githubusercontent.com/lightswitch05/hosts/refs/heads/master/docs/lists/amp-hosts-extended.txt" }, //archived
      { url: "https://raw.githubusercontent.com/ZingyAwesome/easylists-for-pihole/refs/heads/master/easyprivacy.txt" },
      { url: "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Hosts/GoodbyeAds.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/adguard_host.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/adservers.txt" },
      { url: "https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt" },
      { url: "https://v.firebog.net/hosts/AdguardDNS.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/ads.txt" },
    ],
    target: path.join("hosts", "ads.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Apple-AdBlock.txt" },
      { url: "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Huawei-AdBlock.txt" },
      { url: "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Samsung-AdBlock.txt" },
      { url: "https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Xiaomi-Extension.txt" },
      { url: "https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardMobileAds.txt" },
      { url: "https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardCNAMEAds.txt" },
      { url: "https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardTracking.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/adguard_mobile_host.txt" },
      { url: "https://raw.githubusercontent.com/craiu/mobiletrackers/refs/heads/master/list.txt" }, //last update 02.07.2024
      { url: "https://raw.githubusercontent.com/d3ward/toolz/refs/heads/master/src/d3host.txt" },
      { url: "https://raw.githubusercontent.com/bigdargon/hostsVN/refs/heads/master/hosts" },
      { url: "https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardMobileSpyware.txt" },
      { url: "https://raw.githubusercontent.com/neodevpro/neodevhost/refs/heads/master/host" },
      { url: "https://secure.fanboy.co.nz/fanboy-mobile-notifications.txt" },
      { url: "https://gitlab.com/quidsup/notrack-blocklists/raw/master/trackers.hosts" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/easy_privacy_host.txt" },
      { url: "https://v.firebog.net/hosts/Admiral.txt" },
      { url: "https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/ads-and-tracking.txt" },
    ],
    target: path.join("hosts", "ads-2.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://v.firebog.net/hosts/Prigent-Ads.txt" },
      { url: "https://raw.githubusercontent.com/LanikSJ/ubo-filters/refs/heads/main/filters/getadmiral-domains.txt" },
      { url: "https://hostfiles.frogeye.fr/firstparty-trackers.txt" },
      { url: "https://hostfiles.frogeye.fr/multiparty-trackers.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/tracking.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/NoTrack_Tracker_Blocklist.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/ublock_hosts.txt" },
      { url: "https://raw.githubusercontent.com/anudeepND/blacklist/refs/heads/master/adservers.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/kad_host.txt" },
      { url: "https://raw.githubusercontent.com/bongochong/CombinedPrivacyBlockLists/refs/heads/master/newhosts-final.hosts" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Ads" },
      { url: "https://raw.githubusercontent.com/FadeMind/hosts.extras/refs/heads/master/add.2o7Net/hosts" },
      { url: "https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/refs/heads/master/data/hosts/spy.txt" },
      { url: "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Tracking" },
    ],
    target: path.join("hosts", "ads-3.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://hole.cert.pl/domains/v2/domains_hosts.txt" },
      { url: "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/refs/heads/main/scam-urls.txt" },
      { url: "https://raw.githubusercontent.com/durablenapkin/scamblocklist/refs/heads/master/hosts.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/scam.txt" },
      { url: "https://raw.githubusercontent.com/jarelllama/Scam-Blocklist/refs/heads/main/lists/wildcard_domains/scams.txt" },
      { url: "https://raw.githubusercontent.com/FadeMind/hosts.extras/refs/heads/master/add.Spam/hosts" },
      { url: "https://raw.githubusercontent.com/RPiList/specials/refs/heads/master/Blocklisten/spam.mails" },
      { url: "https://www.stopforumspam.com/downloads/toxic_domains_whole.txt" },
      { url: "https://raw.githubusercontent.com/Spam404/lists/refs/heads/master/main-blacklist.txt" },
      { url: "https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/refs/heads/main/pihole-phishing-adlist.txt" },
      { url: "https://v.firebog.net/hosts/RPiList-Phishing.txt" },
      { url: "https://phishing.army/download/phishing_army_blocklist_extended.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/phishing.txt" },
      { url: "https://raw.githubusercontent.com/RPiList/specials/refs/heads/master/Blocklisten/Phishing-Angriffe" },
    ],
    target: path.join("hosts", "gen.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/malware.txt" },
      { url: "https://raw.githubusercontent.com/DandelionSprout/adfilt/refs/heads/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt" },
      { url: "https://v.firebog.net/hosts/RPiList-Malware.txt" },
      { url: "https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts-online.txt" },
      { url: "https://raw.githubusercontent.com/RPiList/specials/refs/heads/master/Blocklisten/malware" },
      { url: "https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/ransomware.txt" },
      { url: "https://raw.githubusercontent.com/StevenBlack/hosts/refs/heads/master/hosts" },
    ],
    target: path.join("hosts", "gen-2.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://big.oisd.nl" },
      { url: "https://urlhaus.abuse.ch/downloads/hostfile" },
      { url: "https://raw.githubusercontent.com/hagezi/dns-blocklists/refs/heads/main/hosts/pro.txt" },
      { url: "https://raw.githubusercontent.com/deathbybandaid/piholeparser/refs/heads/master/Subscribable-Lists/ParsedBlacklists/EasyList.txt" }, //archived
      { url: "https://v.firebog.net/hosts/static/w3kbl.txt" },
      { url: "https://justdomains.github.io/blocklists/lists/adguarddns-justdomains.txt" },
      { url: "https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt" },
    ],
    target: path.join("hosts", "gen-3.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/refs/heads/master/KADhosts.txt" },
      { url: "https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/refs/heads/master/generated/hosts" },
      { url: "https://winhelp2002.mvps.org/hosts.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/KADhosts.txt" },
      { url: "https://raw.githubusercontent.com/deathbybandaid/piholeparser/refs/heads/master/Subscribable-Lists/ParsedBlacklists/EasyList-Liste-FR.txt" }, //archived
      { url: "https://raw.githubusercontent.com/FadeMind/hosts.extras/refs/heads/master/add.Risk/hosts" },
      { url: "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt" },
      { url: "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-blocklist.txt" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Malware" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Scam" },
    ],
    target: path.join("hosts", "gen-4.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/piracy.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/drugs.txt" },
      { url: "https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/torrent.txt" },
    ],
    target: path.join("hosts", "illegal.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/refs/heads/master/hosts.txt" },
      { url: "https://v.firebog.net/hosts/Prigent-Crypto.txt" },
      { url: "https://zerodot1.gitlab.io/CoinBlockerLists/hosts" },
      { url: "https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/crypto.txt" },
      { url: "https://raw.githubusercontent.com/LanikSJ/ubo-filters/refs/heads/main/filters/cryptomining-domains.txt" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Cryptocurrency" },
    ],
    target: path.join("hosts", "crypto.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/gambling.txt" },
      { url: "https://raw.githubusercontent.com/alsyundawy/TrustPositif/refs/heads/main/gambling_indonesia.txt" },
      { url: "https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/gambling-hosts.txt" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Gambling" },
    ],
    target: path.join("hosts", "gambling.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/tiktok.txt" },
      { url: "https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/snapchat.txt" },
      { url: "https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/tiktok.txt" },
      { url: "https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/omegle.txt" },
      { url: "https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/instagram.txt" },
    ],
    target: path.join("hosts", "media.txt"),
    useWhitelist: false,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/porn.txt" },
      { url: "https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/refs/heads/master/lists/pi_blocklist_porn_all.list" },
    ],
    target: path.join("hosts", "porn.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://nsfw.oisd.nl" },
      { url: "https://raw.githubusercontent.com/Sinfonietta/hostfiles/refs/heads/master/pornography-hosts" },
      { url: "https://raw.githubusercontent.com/cbuijs/ut1/refs/heads/master/dating/domains.original" },
      { url: "https://raw.githubusercontent.com/cbuijs/ut1/refs/heads/master/sexual_education/domains.original" },
    ],
    target: path.join("hosts", "porn-2.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/refs/heads/master/HOSTS.txt" },
      { url: "https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt" },
      { url: "https://raw.githubusercontent.com/deathbybandaid/piholeparser/refs/heads/master/Subscribable-Lists/CountryCodesLists/France.txt" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Adult" },
      { url: "https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Dating" },
    ],
    target: path.join("hosts", "porn-3.txt"),
    useWhitelist: true,
  },
  {
    urls: [
      { url: "https://raw.githubusercontent.com/marktron/fakenews/refs/heads/master/fakenews" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/abuse.txt" },
      { url: "https://urlhaus.abuse.ch/downloads/hostfile" },
      { url: "https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/fraud.txt" },
    ],
    target: path.join("hosts", "other-junk.txt"),
    useWhitelist: true,
  },
];
const whitelistPath = path.join("whitelist/whitelist.txt");
const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.3";
async function getData(url) {
  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": userAgent },
    });

    if (response.status >= 400 && response.status < 600) {
      console.error(`Error ${response.status} for ${url}`);
      return null;
    }

    return response.data;
  } catch (err) {
    console.error("Error fetching " + url + ": " + err.message);
    return null;
  }
}
function cleanLine(line) {
  if (!line) return "";
  line = line.trim();
  line = line.split("#")[0].trim();
  line = line.split("!")[0].trim();
  line = line.split("[")[0].trim();
  if (line.startsWith("#") || line.startsWith("!") || line.startsWith("[") || line === "") {
    return "";
  }
  if (line.startsWith("0.0.0.0 ") || line.startsWith("127.0.0.1 ")) {
    return line.split(" ").slice(1).join(" ").trim();
  }
  return line;
}
function getWhitelist() {
  try {
    const data = fs.readFileSync(whitelistPath, "utf8");
    console.log("Loaded whitelist from " + whitelistPath);
    return new Set(
      data
        .trim()
        .split("\n")
        .map((line) => cleanLine(line).toLowerCase())
    );
  } catch (err) {
    console.error("Error loading whitelist file: " + err.message);
    return new Set();
  }
}
function isWhitelisted(line, whitelist) {
  for (let entry of whitelist) {
    if (line.includes(entry)) {
      return true;
    }
  }
  return false;
}
async function updateFilesAndCommit() {
  let whitelist = getWhitelist();
  let totalEntries = 0;
  let totalRemoved = 0;
  let totalConverted = 0;
  for (let fileSet of sourceFiles) {
    let content = "";
    for (let source of fileSet.urls) {
      let data = await getData(source.url);
      if (data === null) {
        console.log(`Error fetching data from ${source.url}`);
      }
      if (data) {
        content += data + "\n";
      }
    }
    let lines = content.split("\n");
    let filteredLines = [];
    let removedLines = new Set();
    lines.forEach((line) => {
      let cleanedLine = cleanLine(line);
      if (fileSet.useWhitelist) {
        if (cleanedLine && !isWhitelisted(cleanedLine.toLowerCase(), whitelist)) {
          filteredLines.push(cleanedLine);
          totalConverted++;
        } else if (cleanedLine) {
          removedLines.add(cleanedLine);
          totalRemoved++;
        }
      } else {
        if (cleanedLine) {
          filteredLines.push(cleanedLine);
          totalConverted++;
        }
      }
    });
    let finalContent = filteredLines.join("\n") + "\n";
    fs.writeFileSync(fileSet.target, finalContent);
    console.log("Created hosts file " + fileSet.target);
    console.log(`Total entries for ${fileSet.target}: ${filteredLines.length}`);
    totalEntries += filteredLines.length;
  }
  console.log(`Total queries from all files: ${totalEntries}`);
  console.log(`Total lines removed: ${totalRemoved}`);
  console.log(`Total lines converted: ${totalConverted}`);
}
updateFilesAndCommit();
