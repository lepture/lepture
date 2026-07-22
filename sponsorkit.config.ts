import { defineConfig, tierPresets as presets } from 'sponsorkit'
import fs from 'node:fs/promises'

export default defineConfig({
  github: {
    login: 'lepture',
    type: 'user',
  },
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: presets.xs,
    },
    {
      title: 'Supporters',
      preset: presets.small,
    },
    {
      title: 'Backers',
      monthlyDollars: 10,
      preset: presets.base,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 25,
      preset: presets.medium,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: presets.large,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: presets.xl,
    },
  ],

  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      'sponsors.json',
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== 'PRIVATE')
          .map((i) => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              isOneTime: i.isOneTime,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === 'Organization'
            }
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    )
  },

  onSponsorsAllFetched(sponsors) {
    // via Polar
    sponsors.unshift({
      monthlyDollars: 100,
      privacyLevel: 'PUBLIC',
      sponsor: {
        name: 'Polar',
        login: 'polarsource',
        linkUrl: 'https://polar.sh/',
        avatarUrl: 'https://avatars.githubusercontent.com/u/105373340?s=200&v=4',
        type: 'Organization',
      },
    })

    // via Thanks Dev
    sponsors.unshift({
      monthlyDollars: 40,
      privacyLevel: 'PUBLIC',
      sponsor: {
        name: 'Sentry',
        login: 'getsentry',
        linkUrl: 'https://sentry.io',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1396951?s=200&v=4',
        type: 'Organization',
      },
    })
    sponsors.unshift({
      monthlyDollars: 10,
      privacyLevel: 'PUBLIC',
      sponsor: {
        name: 'Codecov',
        login: 'codecov',
        linkUrl: 'https://codecov.io/',
        avatarUrl: 'https://avatars.githubusercontent.com/u/8226205?s=200&v=4',
        type: 'Organization',
      },
    })
    sponsors.unshift({
      monthlyDollars: 20,
      privacyLevel: 'PUBLIC',
      sponsor: {
        name: 'Canonical',
        login: 'canonical',
        linkUrl: 'https://canonical.com/',
        avatarUrl: 'https://avatars.githubusercontent.com/u/53057619?s=200&v=4',
        type: 'Organization',
      },
    })
    return sponsors
  },

  outputDir: 'static',
  formats: ['svg', 'png'],
  width: 800,
  renderer: 'tiers',
})
