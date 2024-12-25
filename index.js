const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sourceFiles = [
  {
    urls: [
        { url: 'https://adaway.org/hosts.txt', backup: 'backup/ads/1.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/SmartTV_ads.txt', backup: 'backup/ads/2.txt' },
        { url: 'https://raw.githubusercontent.com/ZingyAwesome/easylists-for-pihole/refs/heads/master/easylist.txt', backup: 'backup/ads/3.txt' },//or https://v.firebog.net/hosts/Easylist.txt
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/Ad_filter_list_by_Disconnect.txt', backup: 'backup/ads/4.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/hostfile.txt', backup: 'backup/ads/5.txt' },//updated in july 2024
        { url: 'https://raw.githubusercontent.com/lightswitch05/hosts/refs/heads/master/docs/lists/ads-and-tracking-extended.txt', backup: 'backup/ads/6.txt' },//archived
        { url: 'https://o0.pages.dev/Pro/hosts.txt', backup: 'backup/ads/7.txt' },//or https://raw.githubusercontent.com/badmojr/1Hosts/master/Pro/domains.txt
        { url: 'https://raw.githubusercontent.com/lightswitch05/hosts/refs/heads/master/docs/lists/amp-hosts-extended.txt', backup: 'backup/ads/8.txt' },//archived
        { url: 'https://raw.githubusercontent.com/ZingyAwesome/easylists-for-pihole/refs/heads/master/easyprivacy.txt', backup: 'backup/ads/9.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Hosts/GoodbyeAds.txt', backup: 'backup/ads/10.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/adguard_host.txt', backup: 'backup/ads/11.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/adservers.txt', backup: 'backup/ads/12.txt' },
        { url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt', backup: 'backup/ads/13.txt' },
        { url: 'https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt', backup: 'backup/ads/14.txt' },//or https://v.firebog.net/hosts/AdguardDNS.txt
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/ads.txt', backup: 'backup/ads/15.txt' }
    ],
    target: path.join('hosts', 'ads.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Apple-AdBlock.txt', backup: 'backup/ads2/1.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Huawei-AdBlock.txt', backup: 'backup/ads2/2.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Samsung-AdBlock.txt', backup: 'backup/ads2/3.txt' },
        { url: 'https://raw.githubusercontent.com/jerryn70/GoodbyeAds/refs/heads/master/Extension/GoodbyeAds-Xiaomi-Extension.txt', backup: 'backup/ads2/4.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardMobileAds.txt', backup: 'backup/ads2/5.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardCNAMEAds.txt', backup: 'backup/ads2/6.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardTracking.txt', backup: 'backup/ads2/7.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/adguard_mobile_host.txt', backup: 'backup/ads2/8.txt' },//
        { url: 'https://raw.githubusercontent.com/craiu/mobiletrackers/refs/heads/master/list.txt', backup: 'backup/ads2/9.txt' },//last update 02.07.2024
        { url: 'https://raw.githubusercontent.com/d3ward/toolz/refs/heads/master/src/d3host.txt', backup: 'backup/ads2/10.txt' },
        { url: 'https://raw.githubusercontent.com/bigdargon/hostsVN/refs/heads/master/hosts', backup: 'backup/ads2/11.txt' },
        { url: 'https://raw.githubusercontent.com/r-a-y/mobile-hosts/refs/heads/master/AdguardMobileSpyware.txt', backup: 'backup/ads2/12.txt' },
        { url: 'https://raw.githubusercontent.com/neodevpro/neodevhost/refs/heads/master/host', backup: 'backup/ads2/13.txt' },
        { url: 'https://secure.fanboy.co.nz/fanboy-mobile-notifications.txt', backup: 'backup/ads2/14.txt' },
        { url: 'https://gitlab.com/quidsup/notrack-blocklists/raw/master/trackers.hosts', backup: 'backup/ads2/15.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/easy_privacy_host.txt', backup: 'backup/ads2/16.txt' },
        { url: 'https://v.firebog.net/hosts/Admiral.txt', backup: 'backup/ads2/17.txt' },
        { url: 'https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt', backup: 'backup/ads2/18.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/ads-and-tracking.txt', backup: 'backup/ads2/19.txt' }
    ],
    target: path.join('hosts', 'ads-2.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://v.firebog.net/hosts/Prigent-Ads.txt', backup: 'backup/ads3/1.txt' },
        { url: 'https://raw.githubusercontent.com/LanikSJ/ubo-filters/refs/heads/main/filters/getadmiral-domains.txt', backup: 'backup/ads3/2.txt' },
        { url: 'https://hostfiles.frogeye.fr/firstparty-trackers.txt', backup: 'backup/ads3/3.txt' },
        { url: 'https://hostfiles.frogeye.fr/multiparty-trackers.txt', backup: 'backup/ads3/4.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/tracking.txt', backup: 'backup/ads3/5.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/NoTrack_Tracker_Blocklist.txt', backup: 'backup/ads3/6.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/ublock_hosts.txt', backup: 'backup/ads3/7.txt' },
        { url: 'https://raw.githubusercontent.com/anudeepND/blacklist/refs/heads/master/adservers.txt', backup: 'backup/ads3/8.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/kad_host.txt', backup: 'backup/ads3/9.txt' },
        { url: 'https://raw.githubusercontent.com/bongochong/CombinedPrivacyBlockLists/refs/heads/master/newhosts-final.hosts', backup: 'backup/ads3/10.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Ads', backup: 'backup/ads3/11.txt' },
        { url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/refs/heads/master/add.2o7Net/hosts', backup: 'backup/ads3/12.txt' },
        { url: 'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/refs/heads/master/data/hosts/spy.txt', backup: 'backup/ads3/13.txt' },
        { url: 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext', backup: 'backup/ads3/14.txt' },//
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Tracking', backup: 'backup/ads3/15.txt' }
    ],
    target: path.join('hosts', 'ads-3.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://hole.cert.pl/domains/v2/domains_hosts.txt', backup: 'backup/gen/1.txt' },
        { url: 'https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/refs/heads/main/scam-urls.txt', backup: 'backup/gen/2.txt' },
        { url: 'https://raw.githubusercontent.com/durablenapkin/scamblocklist/refs/heads/master/hosts.txt', backup: 'backup/gen/3.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/scam.txt', backup: 'backup/gen/4.txt' },
        { url: 'https://raw.githubusercontent.com/jarelllama/Scam-Blocklist/refs/heads/main/lists/wildcard_domains/scams.txt', backup: 'backup/gen/5.txt' },
        { url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/refs/heads/master/add.Spam/hosts', backup: 'backup/gen/6.txt' },
        { url: 'https://raw.githubusercontent.com/RPiList/specials/refs/heads/master/Blocklisten/spam.mails', backup: 'backup/gen/7.txt' },
        { url: 'https://www.stopforumspam.com/downloads/toxic_domains_whole.txt', backup: 'backup/gen/8.txt' },
        { url: 'https://raw.githubusercontent.com/Spam404/lists/refs/heads/master/main-blacklist.txt', backup: 'backup/gen/9.txt' },
        { url: 'https://raw.githubusercontent.com/Dogino/Discord-Phishing-URLs/refs/heads/main/pihole-phishing-adlist.txt', backup: 'backup/gen/10.txt' },
        { url: 'https://v.firebog.net/hosts/RPiList-Phishing.txt', backup: 'backup/gen/11.txt' },
        { url: 'https://phishing.army/download/phishing_army_blocklist_extended.txt', backup: 'backup/gen/12.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/phishing.txt', backup: 'backup/gen/13.txt' },
        { url: 'https://raw.githubusercontent.com/RPiList/specials/refs/heads/master/Blocklisten/Phishing-Angriffe', backup: 'backup/gen/14.txt' }
    ],
    target: path.join('hosts', 'gen.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/malware.txt', backup: 'backup/gen2/1.txt' },
        { url: 'https://raw.githubusercontent.com/DandelionSprout/adfilt/refs/heads/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt', backup: 'backup/gen2/2.txt' },
        { url: 'https://v.firebog.net/hosts/RPiList-Malware.txt', backup: 'backup/gen2/3.txt' },
        { url: 'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-hosts-online.txt', backup: 'backup/gen2/4.txt' },
        { url: 'https://raw.githubusercontent.com/RPiList/specials/refs/heads/master/Blocklisten/malware', backup: 'backup/gen2/5.txt' },
        { url: 'https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt', backup: 'backup/gen2/6.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/ransomware.txt', backup: 'backup/gen2/7.txt' },
        { url: 'https://raw.githubusercontent.com/StevenBlack/hosts/refs/heads/master/hosts', backup: 'backup/gen2/8.txt' }
    ],
    target: path.join('hosts', 'gen-2.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://big.oisd.nl', backup: 'backup/gen3/1.txt' },
        { url: 'https://urlhaus.abuse.ch/downloads/hostfile', backup: 'backup/gen3/2.txt' },
        { url: 'https://raw.githubusercontent.com/hagezi/dns-blocklists/refs/heads/main/hosts/pro.txt', backup: 'backup/gen3/3.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/refs/heads/master/Subscribable-Lists/ParsedBlacklists/EasyList.txt', backup: 'backup/gen3/4.txt' },//archived
        { url: 'https://v.firebog.net/hosts/static/w3kbl.txt', backup: 'backup/gen3/5.txt' },
        { url: 'https://justdomains.github.io/blocklists/lists/adguarddns-justdomains.txt', backup: 'backup/gen3/6.txt' },
        { url: 'https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt', backup: 'backup/gen3/7.txt' }
    ],
    target: path.join('hosts', 'gen-3.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/refs/heads/master/KADhosts.txt', backup: 'backup/gen4/1.txt' },
        { url: 'https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/refs/heads/master/generated/hosts', backup: 'backup/gen4/2.txt' },
        { url: 'https://winhelp2002.mvps.org/hosts.txt', backup: 'backup/gen4/3.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/KADhosts.txt', backup: 'backup/gen4/4.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/refs/heads/master/Subscribable-Lists/ParsedBlacklists/EasyList-Liste-FR.txt', backup: 'backup/gen4/5.txt' },//archived
        { url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/refs/heads/master/add.Risk/hosts', backup: 'backup/gen4/6.txt' },
        { url: 'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt', backup: 'backup/gen4/7.txt' },
        { url: 'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-blocklist.txt', backup: 'backup/gen4/8.txt' },//
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Malware', backup: 'backup/gen4/9.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Scam', backup: 'backup/gen4/10.txt' }
    ],
    target: path.join('hosts', 'gen-4.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/piracy.txt', backup: 'backup/illegal/1.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/drugs.txt', backup: 'backup/illegal/2.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/hate-and-junk-extended.txt', backup: 'backup/illegal/3.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/torrent.txt', backup: 'backup/illegal/4.txt' },
    ],
    target: path.join('hosts', 'illegal.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/refs/heads/master/hosts.txt', backup: 'backup/crypto/1.txt' },
        { url: 'https://v.firebog.net/hosts/Prigent-Crypto.txt', backup: 'backup/crypto/2.txt' },
        { url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts', backup: 'backup/crypto/3.txt' },
        { url: 'https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser', backup: 'backup/crypto/4.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/crypto.txt', backup: 'backup/crypto/5.txt' },
        { url: 'https://raw.githubusercontent.com/LanikSJ/ubo-filters/refs/heads/main/filters/cryptomining-domains.txt', backup: 'backup/crypto/6.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Cryptocurrency', backup: 'backup/crypto/7.txt' }
    ],
    target: path.join('hosts', 'crypto.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/gambling.txt', backup: 'backup/gambling/1.txt' },
        { url: 'https://raw.githubusercontent.com/alsyundawy/TrustPositif/refs/heads/main/gambling_indonesia.txt', backup: 'backup/gambling/2.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/polish-pihole-filters/gambling-hosts.txt', backup: 'backup/gambling/3.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Gambling', backup: 'backup/gambling/4.txt' }
    ],
    target: path.join('hosts', 'gambling.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/tiktok.txt', backup: 'backup/media/1.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/snapchat.txt', backup: 'backup/media/2.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/tiktok.txt', backup: 'backup/media/3.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/omegle.txt', backup: 'backup/media/4.txt' },
        { url: 'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/instagram.txt', backup: 'backup/media/5.txt' }

    ],
    target: path.join('hosts', 'media.txt'),
    useWhitelist: false
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/porn.txt', backup: 'backup/porn/1.txt' },
        { url: 'https://raw.githubusercontent.com/chadmayfield/my-pihole-blocklists/refs/heads/master/lists/pi_blocklist_porn_all.list', backup: 'backup/porn/2.txt' }
    ],
    target: path.join('hosts', 'porn.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://nsfw.oisd.nl', backup: 'backup/porn2/1.txt' },
        { url: 'https://raw.githubusercontent.com/Sinfonietta/hostfiles/refs/heads/master/pornography-hosts', backup: 'backup/porn2/2.txt' },
        { url: 'https://raw.githubusercontent.com/cbuijs/ut1/refs/heads/master/dating/domains.original', backup: 'backup/porn2/3.txt' },
        { url: 'https://raw.githubusercontent.com/cbuijs/ut1/refs/heads/master/sexual_education/domains.original', backup: 'backup/porn2/4.txt' }
    ],
    target: path.join('hosts', 'porn-2.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/4skinSkywalker/Anti-Porn-HOSTS-File/refs/heads/master/HOSTS.txt', backup: 'backup/porn3/1.txt' },
        { url: 'https://www.github.developerdan.com/hosts/lists/dating-services-extended.txt', backup: 'backup/porn3/2.txt' },
        { url: 'https://raw.githubusercontent.com/deathbybandaid/piholeparser/refs/heads/master/Subscribable-Lists/CountryCodesLists/France.txt', backup: 'backup/porn3/3.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Adult', backup: 'backup/porn3/4.txt' },
        { url: 'https://raw.githubusercontent.com/ShadowWhisperer/BlockLists/refs/heads/master/RAW/Dating', backup: 'backup/porn3/5.txt' }
    ],
    target: path.join('hosts', 'porn-3.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/marktron/fakenews/refs/heads/master/fakenews', backup: 'hosts-backup/junk/1.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/abuse.txt', backup: 'hosts-backup/junk/2.txt' },
        { url: 'https://urlhaus.abuse.ch/downloads/hostfile', backup: 'hosts-backup/junk/3.txt' },
        { url: 'https://raw.githubusercontent.com/blocklistproject/Lists/refs/heads/master/fraud.txt', backup: 'hosts-backup/junk/4.txt' }
    ],
    target: path.join('hosts', 'other-junk.txt'),
    useWhitelist: true
  },
  {
    urls: [
        { url: 'https://raw.githubusercontent.com/badmojr/1Hosts/refs/heads/master/Xtra/domains.wildcards', backup: 'backup/extreme/1.txt' },
        { url: 'https://raw.githubusercontent.com/MajkiIT/polish-ads-filter/refs/heads/master/cookies_filters/adblock_cookies.txt', backup: 'backup/extreme/2.txt' },
    ],
    target: path.join('hosts', 'extreme.txt'),
    useWhitelist: true
  },
];
const whitelistPath = path.join('whitelist.txt');
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.3';
async function getData(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': userAgent }
    });

    if (response.status >= 400 && response.status < 600) {
      console.error(`Error ${response.status} for ${url}`);
      return null;
    }

    return response.data;
  } catch (err) {
    console.error('Error fetching ' + url + ': ' + err.message);
    return null;
  }
}
function readLocalBackup(filePath, reason) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('Using backup for ' + filePath + ': ' + reason);
    return data;
  } catch (err) {
    console.error('Error reading local backup file ' + filePath + ': ' + err.message);
    return '';
  }
}
function cleanLine(line) {
  if (!line) return '';
  line = line.trim();
  line = line.split('#')[0].trim();
  line = line.split('!')[0].trim();
  line = line.split('[')[0].trim();
  if (line.startsWith('#') || line.startsWith('!') || line.startsWith('[') || line === '') {
    return '';
  }
  if (line.startsWith('0.0.0.0 ') || line.startsWith('127.0.0.1 ')) {
    return line.split(' ').slice(1).join(' ').trim();
  }
  return line;
}
function getWhitelist() {
  try {
    const data = fs.readFileSync(whitelistPath, 'utf8');
    console.log('Loaded whitelist from ' + whitelistPath);
    return new Set(data.trim().split('\n').map(line => cleanLine(line).cleaned));
  } catch (err) {
    console.error('Error loading whitelist file: ' + err.message);
    return new Set();
  }
}
async function updateFilesAndCommit() {
  let whitelist = getWhitelist();
  let totalEntries = 0;
  let totalRemoved = 0;
  let totalConverted = 0;
  for (let fileSet of sourceFiles) {
    let content = '';
    for (let source of fileSet.urls) {
      let data = await getData(source.url);
      if (data === null) {
        data = readLocalBackup(source.backup, 'Error fetching data');
      }
      if (data) {
        content += data + '\n';
      }
    }
    let lines = content.split('\n');
    let filteredLines = [];
    let removedLines = new Set();
    lines.forEach(line => {
      let cleanedLine = cleanLine(line);
      if (fileSet.useWhitelist) {
        if (cleanedLine && !whitelist.has(cleanedLine.toLowerCase().replace(/\.$/, ''))) {
          if (cleanedLine) {
            filteredLines.push(cleanedLine);
            totalConverted++;
          }
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
    let finalContent = filteredLines.join('\n') + '\n';
    fs.writeFileSync(fileSet.target, finalContent);
    console.log('Created hosts file ' + fileSet.target);
    console.log(`Total entries for ${fileSet.target}: ${filteredLines.length}`);
    totalEntries += filteredLines.length;
  }
  console.log(`Total queries from all files: ${totalEntries}`);
  console.log(`Total lines removed: ${totalRemoved}`);
  console.log(`Total lines converted: ${totalConverted}`);
}
updateFilesAndCommit();