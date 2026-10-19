# HVT website: handover notes

## Content sources and verification

All company content comes from **https://www.hvt.co.za**, crawled on 16 October 2026. The crawl covered all 30 pages in its WordPress sitemap plus the REST API listing.

Nothing has been invented: there are no statistics, clients, awards, testimonials, dates or capabilities that HVT does not publish. Where HVT has not published a fact (for example a project's scope or client), the site leaves it out and says so on the project page.

### Where official pages disagree

| Topic | Conflicting statements on hvt.co.za | Used on this site | Why |
| --- | --- | --- | --- |
| **BBBEE** | Level 3 (/bbbee/, updated 2026-09-29, and homepage headline); Level 2 (homepage bullet); Level 1, 100% black owned (/history/, 2018) | **Level 3 (BYO & BWO)** | Newest page and the homepage headline |
| **CIDB** | 8EP PE / 7CE PE (/about-us/, /home/); EP7 / 7EP (front page "/", /capability/, 2017) | **8EP · 7CE (PE)** | Newer wording |
| **ISO** | ISO 9001:2015 (/about-us/, /home/, and the 2023 certification mark on both homepages); ISO 9001:2008 (front page text, /capability/) | **ISO 9001:2015** | Matches the 2023 certification mark |
| **ISO 14001 / 18001** | "Compliant to ISO 14001 … preparing to achieve ISO 14001 and ISO 18001 formal accreditation" (/about-us/, 2018) | **Not claimed** | Dated; ISO 18001 has been replaced by ISO 45001 |
| **Teams** | "8 crews / 8 teams" vs "numerous teams" | **8 crews, trained and accredited up to 765kV** | Matches the homepage and /substation-lines-services/ |
| **Service list** | "/" lists Reactive Power … Commissioning; /home/ lists RPC/FACTS/HVDC … Switchgear & Mini Subs | **/home/ list** (8 service lines) | More recent and more complete |

### HVT should confirm before launch

1. **Credentials:**
   - BBBEE Level 3 (BYO & BWO), CIDB 8EP/7CE (PE) and ISO 9001:2015 are still current.
   - ISO certificate expiry date and the certification body.
2. **Figures** published by HVT and reused here:
   - "over 600 reactive power projects from 3.3kV to 765kV"
   - "over 95% of Eskom HV shunt capacitor banks"
   - "8 crews … up to 765kV"
   - "supplier to Eskom's 765kV substation build programme"

   Some of the source pages date from 2017–2018.
3. **Testimonial:** the Eskom quote from Danie Bekker (published on /testimonials/) is reproduced verbatim. Confirm that permission to use it still stands.
4. **Projects:**
   - **Groeipunt:** HVT's scope, dates and location.
   - **Bokmakierie:** client, location, voltage, scope and dates. Only photographs are published.
   - **Mount Edgecombe:** HVT's exact lighting scope.
5. **Electrification service:** HVT lists "Electrification" as a service but has no page for it. The site describes it using the 11–132kV overhead lines and cabling items from the site-services page.
6. **Subsidiary name:** "Electrovaya Contruction" is spelled this way on hvt.co.za. This site uses "Electrovaya Construction".
7. **Leadership:** the CEO biography (Ganas "Boogie" Naidoo) comes from /business-leaders/, last updated in 2018. Confirm it is current.
8. **Departmental contacts:** hvt.co.za lists personal contacts (Heinrich, Thabo and Neelan/Ntsane), some on lpp.co.za and htsa.co.za domains. This site routes every enquiry to info@hvt.co.za. Add named contacts only if HVT wants them.
9. **Social development:** these initiatives date from 2018–2023. Confirm which are still current.
   - Solidarity Buckets
   - Tembisa Soccer Club
   - Golf Day 2018
   - Gymnastics sponsorship
10. **Privacy notice:** `/privacy` is a POPIA-oriented starting point. HVT's legal or compliance team should review it and name an Information Officer.
11. **Social media:** no official HVT social accounts were found, so none are linked.

## Housekeeping

`A:\HVT\.qa\` holds the QA browser profile, cache and screenshots used during testing. It is not part of the site and can be deleted.

## Images

**HVT photographs.** All project and service photos are HVT's own, taken from its galleries on hvt.co.za.
- They are resized, and the Bokmakierie set is cropped to remove a baked-in white vignette.
- Each is captioned with its source gallery and never presented as a different project.
- Confirm that the photographers have authorised web reuse.

**Illustrative stock.** Four images from Wikimedia Commons are used: three hero slides and the capability banner. They are labelled "Illustrative image" on the page, and full credits are at `/image-credits`.

| Image | Author | Licence |
| --- | --- | --- |
| Transmission Lines at Sunset | Kkiefuik | CC BY 4.0 |
| Umspannungswerk Hoya | Oest71 | Public domain |
| Transmission tower at dusk | Adi Ulici | CC0 |
| Gordonia substation ZA 2008 (Eskom, Northern Cape; **not** an HVT project) | Graeme Williams, Media Club SA | CC BY-SA 2.0 |

Replacing the stock hero images with professional HVT photography (dusk or blue-hour substation work) would strengthen the site further.

**Logos.** The logos in `public/brand/` are the supplied artwork from `../Logos`. Only the SVG viewBox was cropped to remove padding.

## Design reference

The layout follows the section rhythm of the Nebula Webflow template, Home 1. The design was rebuilt from scratch; no template code, assets or copy were reused.

| Nebula section | HVT version |
| --- | --- |
| Nav + "Explore Menu" pill | Header with Menu pill, services mega menu and full-screen menu |
| Inset hero slider | Hero with progress bar and pause control |
| Sticky split with feature cards | About + vision/values cards |
| Glass CTA banner | Delivery capability |
| Kinetic type band | Transmission / Distribution / Substations |
| Numbered dark service cards with action bar | 8 HVT services |
| Statement + feature strip | Credentials + technical capability |
| Project banners | Groeipunt, Bokmakierie, Mount Edgecombe |
| Testimonial slider | The single published Eskom testimonial |
| Featured articles | SHEQ and Social impact stories |
| Product list | Why work with HVT |
| Newsletter | Project enquiry form |
| Footer | Pill nav bar footer |

Deliberate differences from the reference:
- Manrope/Inter replace the reference's serif display font, as the brief specified.
- HVT amber replaces the rust accent.
- The header becomes a compact sticky bar when scrolling up.
