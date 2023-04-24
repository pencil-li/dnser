# DNSer

DNSer is a decentralized and universal Top-Level Domain (TLD) checker that allows users to obtain information about both ICANN and Handshake TLDs. With DNSer, you can easily fetch the availability, status, and WHOIS information of TLDs. The tool is designed for seamless integration with various frameworks such as NextJS, Svelte, Nuxt, Vue, React, Deno, and more. It can be used on different platforms, including CLI, browsers, and mobile devices.

DNSer offers a live API for Handshake TLDs (https://api-dnser.pencil.li/api/tld/hns) and ICANN TLDs (https://api-dnser.pencil.li/api/tld/icann). It is also available on Docker and can be integrated with NPM. DNSer is open source and hosted on GitHub, allowing you to submit a PR to add your TLDs to the list.

The main code snippet provided demonstrates how to fetch Handshake domain data using axios, a popular promise-based HTTP client for JavaScript. The function fetchHnsDomainData takes a domain name as input and makes multiple API calls to gather various domain-related information. The fetched data is then combined and returned as a single object.

## Fetch any TLD from HNS at lightspeed

Thanks to public DNS resolvers, you can fetch any TLD from Handshake at lightspeed, and you can use it as an API to get the information of any TLD and resolve it.

## Where to discover the API

### NPM

 - https://www.npmjs.com/package/dnser

### Docker

 - https://hub.docker.com/r/itamaesan/dnser

### GitHub

 - https://github.com/Pencil-li/dnser

## Play with the API

### Fetch any TLD from HNS

 - https://api-dnser.pencil.li/api/tld/hns

### Fetch any TLD from ICANN

 - https://api-dnser.pencil.li/api/tld/icann

### Get the DNS resolver of any HNS TLD

 - https://api-dnser.pencil.li/api/dns/hns

### Fetch any DNS resolver of ICANN

 - https://api-dnser.pencil.li/api/dns/icann

### Check if a domain is available on the universal API checker

 - https://api-dnser.pencil.li/api/domain/availability?domain=miguelgargallo

### Check any information of a HNS TLDs

 - https://api-dnser.pencil.li/api/hns/domain/miguelgargallo

## About the API

dnser is a library that allows you to list any TLDs from Handshake to ICANN, also you can use it as an API to get the information of any TLD and resolve it.

- **ICANN** traditional compatible TLDs.
- **Handshake** decentralization compatible TLDs.
- Start from reading the [**Introduction**](https://dnser.pencil.li/introduction/getting-started)
- Play with the API and see the [**API**](https://dnser.pencil.li)
- Fully accessed from npmjs.
- Developed with `typescript` and `javascript` for better performance.

## Installation

```bash
npm i dnser
```

## License

Pylar AI creative ML License 0.0.4

Copyright (c) 2023 Pencil Works LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the Software solely for non-commercial purposes and to show the code or result for scientific purposes. Any commercial use, including without limitation the rights to sell, copy, modify, merge, publish, distribute, sublicense, or use the Software as part of a commercial product, is strictly prohibited.

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
