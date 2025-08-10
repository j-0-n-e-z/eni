import { Subtitle } from '../../types'

export const expected = {
	avatar: [
		{
			id: 1,
			timecode: '00:00:39,759 --> 00:00:48,467',
			text: `When I was lying there in the VA hospital, with a big hole blown through the middle of my life, I started having these dreams of flying.`
		},
		{
			id: 4,
			timecode: '00:00:49,769 --> 00:00:51,272',
			text: 'I was free.'
		},
		{
			id: 5,
			timecode: '00:00:54,441 --> 00:00:58,135',
			text: `Sooner or later, though, you always have to wake up.`
		},
		{
			id: 6,
			timecode: '00:01:07,787 --> 00:01:13,668',
			text: `They can fix a spinal, if you got the money, but not on vet benefits, not in this economy.`
		},
		{
			id: 8,
			timecode: '00:01:15,086 --> 00:01:17,877',
			text: `A VA check and 12 bucks will get you a cup of coffee.`
		},
		{
			id: 9,
			timecode: '00:01:18,465 --> 00:01:20,697',
			text: `I'm what they call... waitlisted.`
		},
		{
			id: 10,
			timecode: '00:01:29,684 --> 00:01:34,271',
			text: `The Bengal Tiger, extinct for over a century is making a comeback.`
		},
		{
			id: 11,
			timecode: '00:01:34,272 --> 00:01:42,488',
			text: `These cloned tiger cubs at the Beijing Zoo are the latest of a number of species that have been cloned back into existence in the past five years.`
		},
		{
			id: 13,
			timecode: '00:01:42,489 --> 00:01:47,901',
			text: `I became a marine for the hardship. To be hammered on the anvil of life.`
		}
	],
	hobbit: [
		{
			id: 1,
			timecode: '00:01:04,773 --> 00:01:19,497',
			text: 'My dear Frodo: You asked me once if I had told you everything there was to know about my adventures.'
		},
		{
			id: 4,
			timecode: '00:01:19,621 --> 00:01:26,924',
			text: 'And while I can honestly say I have told you the truth I may not have told you all of it.'
		},
		{
			id: 6,
			timecode: '00:01:34,970 --> 00:01:37,018',
			text: 'I am old now, Frodo.'
		},
		{
			id: 7,
			timecode: '00:01:38,473 --> 00:01:41,272',
			text: "I'm not the same Hobbit I once was."
		},
		{
			id: 8,
			timecode: '00:01:44,563 --> 00:01:51,908',
			text: 'I think it is time for you to know what really happened.'
		},
		{
			id: 10,
			timecode: '00:01:53,447 --> 00:02:06,336',
			text: 'It began long ago in a land far away to the east the like of which you will not find in the world today.'
		},
		{
			id: 13,
			timecode: '00:02:16,303 --> 00:02:18,897',
			text: 'There was the city of Dale.'
		}
	]
} as const satisfies Record<string, Subtitle[]>
