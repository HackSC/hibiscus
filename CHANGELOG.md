## [1.0.2]

### Unreleased

[#458](https://github.com/HackSC/hibiscus/pull/458)

- Implement Supabase database listener for new check-ins in Identity Portal
- Optimize database calls when initially fetching check-in data in Identity Portal
- Fix "Disable SSO" option crashing in dev

## [1.0.1] - 2023-03-30

[#437](https://github.com/HackSC/hibiscus/pull/437)
[#443](https://github.com/HackSC/hibiscus/pull/443)

- Added Nix into the mix :) using it for CI(/CD) and local development
- Removed redundant test files that don't add value
- Python service + library code generators w/ Serverless Framework
- Added pre-commit hook `.pre-commit-hooks.yml` for preventing hardcoded secrets
- Prod build of `battlepass-api`
- New Airplane task for getting hackers' app data in bulk
- `build-on-some-branches.sh` script because the old script takes too long as a
  Vercel ignore build step, eats up Vercel queue and sometimes unreliable; we will only deploy prod
  apps
- `activate-env.sh` for easy Python environment activation
- Simple event service

## [1.0.0] - 2023-02-21

Below is just mostly a concise and reorganized Git dump since we started developing Hibiscus in May 2022 (to which we never kept a changelog). We will start adding better changelogs from now on for everyone to have better oversight of every changes to Hibiscus.

Per 1.0.0, this is what we actually used in HackSC 2023, which includes:

1. Hacker (battlepass) / application portal (+ Hackform which was used to collect hacker apps)
2. Sponsor portal
3. Identity portal (fmr. known as volunteer portal, used to check people in via RFID wristbands)
4. HackSC SSO

### Fixed

- Fix excessive API calls (#420)
- Hot fixed resume support. (#418)
- Hotfix migrations (#417)
- fix migration (#414)
- Fix reset email double confirmation bug (#388)
- screen aspect ratio fix for www-2023 (#382)
- fix hackform responsiveness (#345)
- Fix/www 2023 sponsors (#353)
- fix not showing user application status after app submit (#340)
- fix speaker bio (#343)
- Fix token refresh (closes HIB-138) (#342)
- fixed newsletter responsiveness (#336)
- quick fix for ux (#335)
- www 2023 fixes (#334)
- fix application status logic (#321)
- navbar link fixes (#107)
- Fix (#106)
- Uncomment feature flags + MongoClient overflow connection fixes (#422)
- Fix database migrations (#301)
- Fix blocked schools endpoint on dashboard (#299)
- fix Supabase migration action (#241)
- fix CI problem for Supabase migration (#239)
- dogfood hackform fix (#294)
- Fix 405 error on login (#289)
- Hib 85 minor fixes for v2 feedback (#273)
- Fix SSO signup (#288)
- fix calendar not registering styles on Storybook (#270)
- Evp 9 minor fixes for v1 feedback (#266)
- fix long text can't type (#267)
- fix bug arrow not being displayed on hackform (#246)
- some fixes to make single dropdown work (#228)
- fix yaml problem with env not being available on startup (#126)

### Removed

- remove husky lint,test hook and replace with only formatting (prettier) checks (#140)
- PR template remove deployment preview (#118)
- nx remove the e2es (#53)

### Refactored

- refactor Hackform to use Redux (#269)

### Added

- Automatically refresh access token slightly before it expires (#374)
- updated battlepass ui (#419)
- Patch resume URL in sponsor portal (#415)
- Dev release (#412)
- Production release [2023] (#403)
- sponsor updates (#400)
- use mongodb instead for feature flags (#396)
- speaker added - neil davé (#395)
- port feature flags to redis + rsvp form open ff (#389)
- enhancements for RSVP stuff (#387)
- reset password hidden (#386)
- applications closed (#384)
- apps closed logic on dashboard + hackform; rejection message (#383)
- Created RSVP form (#375)
- Sponsors update on www-2023 (#366)
- change codeowners (#378)
- add Sentry error tracing to dashboard (#376)
- Change MAX_AGE env variable to 1 week (#369)
- Make changes for merge request. (#361)
- reduce word count (#360)
- bg update (#352)
- add sponsor logo (#347)
- add additional FQA questions (#339)
- 2023 design update (#337)
- add amplify.yml (#331)
- add illustrations to team-service (#332)
- Suhit/www 2023 (#328)
- add illustrations to hackform (#322)
- add rate limit + block team services api (#330)
- team members field (#327)
- defer team service (#325)
- add application status fill (#323)
- Hib 82 create team service frontend (#300)
- Apply redirect to signup (#320)
- redirect hack.sc to hacksc.com (#319)
- Hib 126 polish sso (#317)
- Replace resend confirmation email link with message (#316)
- file upload improvements (#315)
- hackform responsiveness (#314)
- add airplane scripts; `setOptions` for HBSC (#313)
- SSO Guard API paths (#309)
- Hib 90 application status on portal (#310)
- create db migration – discord id bot (#311)
- setup event service + migrations (#308)
- improvements to hackform (#305)
- simple Pointr implementation (#306)
- req changes (#303)
- add redirect to /sp23-diagrams (#304)
- improved security for Hackform API calls (#302)
- Reduce supabase database queries on dashboard (#298)
- Dashboard SSO integration (#295)
- hib 89 hib 108 (#296)
- HIB-95 common logout function (#282)
- HIB-80 prevent people from putting custom callback URL (#279)
- add schools and majors (#293)
- implement file upload question + backend integration (#287)
- HIB-94 SSO defaults redirect to portal (#281)
- Suhit/www 2023 (#285)
- Hib 68 add all questions into hackform (#284)
- adding last line to readme describing our open source intention (#280)
- add "Others" field into single choice input (#277)
- preparation for publicizing repo (#278)
- SSO auth (#215)
- added 404 page (#276)
- added date question template and birthday question (#274)
- single choice question for Hackform (#272)
- add autocomplete for date picker (#271)
- menu bar implementation (#265)
- date picker component (#248)
- @hacksc-platforms -> @hibiscus + buildable libs (#264)
- add more stuff to kodiak (#263)
- improvements to CI jobs (#262)
- `discord-identity-bot` app init setup (#259)
- Supabase migration CI improvements + codeowners (#247)
- skip build if app doesnt exist in branch (#245)
- upgrade nx and arrow button (#244)
- Back/Next button in Hackform silently validates (#233)
- disable lint and typescript checks in build to improve CI perf (#242)
- CODEOWNERS (#243)
- Log server first release (#197)
- search input w/ dropdown options component (#225)
- basic Hackform implementation (#222)
- readme (#221) (#223)
- dashboard ui update (#221)
- Hackform DB client and some changes to Hackform (#220)
- implemented arrow button (#214)
- Dashboard (#213)
- 2023 UI kit (#198)
- Create @hacksc-platforms/ui-kit-2023 (#193)
- upgrade (#185)
- HackSC Node.js service app generator (#170)
- add preset roles migration (#167)
- setup boilerplate RBAC (#164)
- hacksc vercel next.js generator generated vercel project -> this monorepo (#154)
- migration and generated types CI + prod Supabase schema push CD (#150)
- fastify (#152)
- setup unit testing infrastructure with Supabase (#149)
- combine PRs new fastify (#119)
- Moved lightbulb a little to the left for screens >1440 SIT-7 (#146)
- Added Vercel Logo issue SIT-1 (#145)
- adding react spinners (#144)
- done (#139)
- /infosession -> zoom link (#131)
- 124 general implement GitHub action to change project v2 fields on certain webhook events (#125)
- google analytics update + added on landing page (#117)
- add a few workflows for better GHP cards <-> PR automation (#115)
- make install more efficient (#113)
- automerge (#114)
- next config update using styledComponents valid after nextjs v12 (#108)
- make teams section more responsive (#105)
- pointer on flippy (#104)
- hacksc memories + apply now button
- [recruitment] enable GA4 (#99)
- student experiencestestimonials complete (#97)
- put Join our team back (#95)
- teams section (#93)
- alumi destinations (#91)
- 39 implement hacksc memories section (#90)
- 38 recruitment teams section (#88)
- 38 recruitment teams section (#87)
- 35 recruitment intro section with lightbulb illustration + student powered texts (#85)
- logo spacing for higher resolution screens (#84)
- dependabot PR combines (#82)
- hero + navbar (#80)
- recruitment set up (#56)
