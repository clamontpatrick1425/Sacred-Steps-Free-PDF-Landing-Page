import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  BookOpen,
  ExternalLink,
  ListChecks,
  FileText,
  ChevronRight,
  Bell,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  CORE_PREVIEW_PDF_PATH,
  CORE_PREVIEW_PDF_FILENAME,
  downloadCorePreviewPdf,
} from '../lib/pdf';

interface CoreSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinWaitlist: () => void;
}

interface CoreDaySample {
  day: number;
  scripture: string;
  reference: string;
  truth: string;
  affirmation: string;
  sacredStep: string;
}

interface CoreWeekSample {
  weekNumber: number;
  title: string;
  intro: string;
  reflection: string;
  days: CoreDaySample[];
}

const MONTH_ROADMAP = [
  {
    month: 'January',
    theme: 'IDENTITY',
    subtitle: 'Who God Says I Am',
    includedInPreview: true,
    weeks: [
      'Week 1: I Am Chosen',
      'Week 2: I Am Loved, Not Labeled',
      'Week 3: I Am a New Creation',
      'Week 4: I Am Not My Past',
      "Week 5: I Am God's Child",
    ],
  },
  {
    month: 'February',
    theme: 'GRACE',
    subtitle: 'Releasing Shame & Guilt',
    includedInPreview: false,
    weeks: [
      'Week 6: Grace Greater Than My Guilt',
      'Week 7: Letting Go of Shame',
      'Week 8: Grace for the Relapse',
      'Week 9: Grace That Covers It All',
    ],
  },
  {
    month: 'March',
    theme: 'FAITH',
    subtitle: 'Learning to Trust God',
    includedInPreview: false,
    weeks: [
      "Week 10: Trusting God With What I Can't Control",
      'Week 11: Faith in the Waiting',
      'Week 12: Faith Over Fear',
      'Week 13: Small Faith, Big God',
    ],
  },
  {
    month: 'April',
    theme: 'FREEDOM',
    subtitle: 'Breaking Strongholds',
    includedInPreview: false,
    weeks: [
      'Week 14: Naming My Stronghold',
      'Week 15: The Chains Are Broken',
      "Week 16: Freedom From Addiction's Grip",
      'Week 17: Freedom From People-Pleasing',
      'Week 18: Walking in Freedom Daily',
    ],
  },
  {
    month: 'May',
    theme: 'HEALING',
    subtitle: 'Restoring the Broken Places',
    includedInPreview: false,
    weeks: [
      'Week 19: God Sees the Broken Places',
      'Week 20: Healing From Old Wounds',
      'Week 21: Healing Takes Time',
      'Week 22: Restored, Not Repaired',
    ],
  },
  {
    month: 'June',
    theme: 'DISCIPLINE',
    subtitle: "Choosing God's Way",
    includedInPreview: false,
    weeks: [
      'Week 23: Discipline Over Feelings',
      'Week 24: Building New Habits',
      'Week 25: Guarding My Heart and Mind',
      'Week 26: Consistency Over Perfection',
    ],
  },
  {
    month: 'July',
    theme: 'COURAGE',
    subtitle: "Facing What I've Avoided",
    includedInPreview: false,
    weeks: [
      'Week 27: Courage to Face the Truth',
      'Week 28: Courage to Ask for Help',
      'Week 29: Courage to Set Boundaries',
      'Week 30: Courage in Hard Conversations',
      'Week 31: Courage to Keep Going',
    ],
  },
  {
    month: 'August',
    theme: 'FORGIVENESS',
    subtitle: 'Releasing the Past',
    includedInPreview: false,
    weeks: [
      'Week 32: Forgiving Myself',
      'Week 33: Forgiving Those Who Hurt Me',
      'Week 34: Releasing the Right to Get Even',
      'Week 35: Forgiveness as a Daily Choice',
    ],
  },
  {
    month: 'September',
    theme: 'PEACE',
    subtitle: 'Quieting the Storm',
    includedInPreview: false,
    weeks: [
      'Week 36: Peace in the Middle of Chaos',
      'Week 37: Quieting Anxious Thoughts',
      'Week 38: Peace That Guards My Heart',
      "Week 39: Resting in God's Presence",
    ],
  },
  {
    month: 'October',
    theme: 'PURPOSE',
    subtitle: "Discovering Why I'm Here",
    includedInPreview: false,
    weeks: [
      'Week 40: My Story Has Purpose',
      'Week 41: Made for More',
      'Week 42: Serving Out of My Healing',
      'Week 43: Purpose in the Ordinary Days',
      'Week 44: Walking in My Calling',
    ],
  },
  {
    month: 'November',
    theme: 'GRATITUDE',
    subtitle: "Seeing God's Goodness",
    includedInPreview: false,
    weeks: [
      'Week 45: Gratitude in Small Things',
      'Week 46: Gratitude in Hard Seasons',
      "Week 47: Counting God's Faithfulness",
      'Week 48: A Thankful Heart, A Healed Heart',
    ],
  },
  {
    month: 'December',
    theme: 'REDEMPTION',
    subtitle: 'Becoming the New Creation',
    includedInPreview: false,
    weeks: [
      'Week 49: The Old Has Gone',
      'Week 50: Redemption Is a Process',
      'Week 51: Becoming Who God Says I Am',
      'Week 52: Sustained Walking, Daily Freedom',
    ],
  },
];

const JANUARY_SAMPLE_WEEKS: CoreWeekSample[] = [
  {
    weekNumber: 1,
    title: 'Week 1: I Am Chosen',
    intro:
      "For a long time, I believed I had to earn a place at the table — that God's love for me was a reward for good behavior I hadn't managed to produce yet. This week is about unlearning that. Being chosen was never about your performance. It was God's decision, made before your first mistake and unshaken by your worst one.",
    reflection:
      "We started where every renewed identity has to start — with the fact that you were chosen before you had anything to offer. That's not a nice idea. It's the floor everything else in this book is built on. Next week, we go further: not just chosen, but loved in a way that refuses to be reduced to a label.",
    days: [
      {
        day: 1,
        scripture:
          '“But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.”',
        reference: '1 Peter 2:9, KJV',
        truth:
          "Being chosen was never about earning it — it was about God's initiative, not your performance.",
        affirmation:
          'I am chosen by God, not because of what I have done, but because of who He is. My past does not disqualify me from His calling on my life.',
        sacredStep:
          'Write down one lie you’ve believed about being "not chosen," and cross it out today.',
      },
      {
        day: 2,
        scripture:
          '“Ye have not chosen me, but I have chosen you, and ordained you, that ye should go and bring forth fruit.”',
        reference: 'John 15:16, KJV',
        truth: "I didn't find God first. He pursued me long before I turned around.",
        affirmation:
          'I am not chasing after worth I have to prove. God chose me before I ever chose Him, and that settles the question of my value.',
        sacredStep: 'Say out loud, "God chose me," before you leave the house today.',
      },
      {
        day: 3,
        scripture:
          '“According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love.”',
        reference: 'Ephesians 1:4, KJV',
        truth: 'My identity was decided before my worst season ever started.',
        affirmation:
          'I am chosen from before the foundation of the world — my hardest year does not override a decision God made before I existed.',
        sacredStep:
          'Read Ephesians 1 slowly and underline every phrase that describes who you are in Christ.',
      },
      {
        day: 4,
        scripture:
          '“But now thus saith the LORD that created thee... Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine.”',
        reference: 'Isaiah 43:1, KJV',
        truth: 'God knows my name — not just my record.',
        affirmation:
          'I am called by name, not by my mistakes. I belong to God, and nothing in my past changes whose I am.',
        sacredStep: 'Write your own name in the margin next to this verse today.',
      },
      {
        day: 5,
        scripture:
          '“Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering.”',
        reference: 'Colossians 3:12, KJV',
        truth:
          "Being chosen changes how I'm allowed to treat myself, not just how I treat others.",
        affirmation:
          "I am God's elect, clothed in mercy and kindness — including mercy toward myself on the days I fall short.",
        sacredStep:
          "Extend yourself one act of kindness today that you'd normally withhold.",
      },
      {
        day: 6,
        scripture:
          '“For thou art an holy people unto the LORD thy God: the LORD thy God hath chosen thee to be a special people unto himself.”',
        reference: 'Deuteronomy 7:6, KJV',
        truth:
          "Being chosen isn't a one-time event from the past. It's a present reality.",
        affirmation:
          "I am set apart for God's purposes today, not because I am flawless, but because He has claimed me as His own.",
        sacredStep:
          'Name one habit that doesn\'t match "set apart," and choose differently just once today.',
      },
      {
        day: 7,
        scripture: '“Knowing, brethren beloved, your election of God.”',
        reference: '1 Thessalonians 1:4, KJV',
        truth: "Knowing I am chosen isn't pride. It's the peace that ends the arguing.",
        affirmation:
          'I know, beloved, that I am chosen of God. That knowledge is the ground I stand on when doubt tries to pull me under.',
        sacredStep:
          'Thank God specifically, out loud, for choosing you before you go to sleep tonight.',
      },
    ],
  },
  {
    weekNumber: 2,
    title: 'Week 2: I Am Loved, Not Labeled',
    intro:
      'Addicts. Failures. Damaged. Broken. Somewhere along the way, most of us collected labels that felt more true than our own names. This week is about tearing those labels off one at a time and replacing them with the one word that was always underneath: beloved.',
    reflection:
      "Labels are loud, but they aren't loyal — they'll leave the second you're not looking. Love, the kind we read about this week, doesn't move. Next week we take this a step further and talk about what happens to someone who is truly loved: they don't just feel different, they become different. New.",
    days: [
      {
        day: 1,
        scripture:
          '“Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God.”',
        reference: '1 John 3:1, KJV',
        truth:
          'The label "son" or "daughter" was always underneath every other name I wore.',
        affirmation:
          'I am a child of God, not a label the world or my own shame assigned me. That is the name that outlasts every other one.',
        sacredStep:
          'Write "beloved child of God" somewhere you\'ll see it first thing tomorrow morning.',
      },
      {
        day: 2,
        scripture:
          '“I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.”',
        reference: 'Jeremiah 31:3, KJV',
        truth:
          "God's love isn't a reaction to my recovery. It's the reason I have a recovery to walk.",
        affirmation:
          'I am loved with an everlasting love — a love that existed before my struggle and will remain long after it.',
        sacredStep:
          "List three things you've believed love had to be earned by, and set them down today.",
      },
      {
        day: 3,
        scripture:
          '“But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.”',
        reference: 'Romans 5:8, KJV',
        truth: "God didn't wait for me to clean up before He loved me.",
        affirmation:
          "I was loved at my worst, not just my best. That means I don't have to perform to stay worthy of love now.",
        sacredStep:
          'Recall one moment you felt "too far gone," and thank God He didn\'t agree.',
      },
      {
        day: 4,
        scripture:
          '“There is therefore now no condemnation to them which are in Christ Jesus.”',
        reference: 'Romans 8:1, KJV',
        truth: 'Condemnation and conviction are not the same voice.',
        affirmation:
          "I live free of condemnation. Christ's love does not come with a running tally of my failures attached.",
        sacredStep:
          'Notice one condemning thought today and answer it out loud with this verse.',
      },
      {
        day: 5,
        scripture:
          '“Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?”',
        reference: 'Romans 8:35, KJV',
        truth:
          "Nothing about my circumstances is powerful enough to unhook me from God's love.",
        affirmation:
          'I am inseparable from the love of Christ — not my relapse, not my regret, not my worst day can move me out of His reach.',
        sacredStep:
          'Name the hardest circumstance in your life right now, and speak this verse over it.',
      },
      {
        day: 6,
        scripture: '“Ye are all the children of God by faith in Christ Jesus.”',
        reference: 'Galatians 3:26, KJV',
        truth: 'My family name was changed the day I put faith in Christ.',
        affirmation:
          "I am a child of God by faith, not by feeling. Some days I won't feel it, and it will be true anyway.",
        sacredStep:
          'Tell one trusted person today, "I\'m learning to believe I\'m loved, not labeled."',
      },
      {
        day: 7,
        scripture:
          '“The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy... he will joy over thee with singing.”',
        reference: 'Zephaniah 3:17, KJV',
        truth: "God isn't tolerating me. He is rejoicing over me.",
        affirmation:
          "I am someone God sings over. That truth doesn't depend on how put-together my week looked.",
        sacredStep:
          "Play or hum a worship song today and let it be a reminder that you're sung over, not just endured.",
      },
    ],
  },
  {
    weekNumber: 3,
    title: 'Week 3: I Am a New Creation',
    intro:
      "There's a version of you that existed before Christ got involved in your story, and there's a version that exists now. This week is about believing that the second version is actually real — not a performance, not wishful thinking, but a fact Scripture states plainly.",
    reflection:
      "You are not who you used to be, even on the days it feels like nothing has changed. New creation isn't a metaphor — it's a fact you're learning to live inside of. Next week, we take a harder look at something that tries to convince you otherwise: your past.",
    days: [
      {
        day: 1,
        scripture:
          '“Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.”',
        reference: '2 Corinthians 5:17, KJV',
        truth:
          "New isn't something I have to become someday. It's something I already am in Christ.",
        affirmation:
          'I am a new creation. The old version of my life has passed away, even on the days my old habits try to argue otherwise.',
        sacredStep:
          'Name one "old thing" you\'re ready to let stay in the past today.',
      },
      {
        day: 2,
        scripture:
          '“For we are his workmanship, created in Christ Jesus unto good works.”',
        reference: 'Ephesians 2:10, KJV',
        truth:
          "I am not a finished product, but I am not a mistake either — I'm a work in progress made on purpose.",
        affirmation:
          "I am God's workmanship, crafted with intention. My story is being written by a Creator who doesn't waste material.",
        sacredStep:
          'Do one small "good work" today, even something private no one else will see.',
      },
      {
        day: 3,
        scripture:
          '“And that ye put on the new man, which after God is created in righteousness and true holiness.”',
        reference: 'Ephesians 4:24, KJV',
        truth: 'Putting on the new man is a daily choice, not a one-time event.',
        affirmation:
          'I put on the new man today. I choose the identity Christ gave me over the one addiction tried to assign me.',
        sacredStep:
          'Before you dress this morning, say quietly, "I am putting on who Christ made me."',
      },
      {
        day: 4,
        scripture:
          '“I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me.”',
        reference: 'Galatians 2:20, KJV',
        truth:
          "The old version of me isn't just hiding. It's dead, and something new took its place.",
        affirmation:
          "I am alive in a way that isn't about my own strength anymore. Christ lives in me, and that changes what's possible for my day.",
        sacredStep:
          "List one thing you're attempting today in your own strength, and hand it over in prayer.",
      },
      {
        day: 5,
        scripture: '“Old things are passed away; behold, all things are become new.”',
        reference: '2 Corinthians 5:17, KJV',
        truth: '"All things" includes the parts of me I assumed were permanent.',
        affirmation:
          'I am not permanently defined by anything old. What God is doing in me now is more real than what used to be true about me.',
        sacredStep:
          'Write one "permanent" belief about yourself, then write "temporary" beside it.',
      },
      {
        day: 6,
        scripture:
          '“As newborn babes, desire the sincere milk of the word, that ye may grow thereby.”',
        reference: '1 Peter 2:2, KJV',
        truth: "New creations grow slowly, and that's not a flaw in the process.",
        affirmation:
          "I am growing, one small step at a time. I don't have to arrive today to be making real progress.",
        sacredStep:
          "Read one short passage of Scripture today simply because it feeds you, not because it's a task.",
      },
      {
        day: 7,
        scripture: '“Wherefore if any man be in Christ, he is a new creature.”',
        reference: '2 Corinthians 5:17, KJV',
        truth:
          "This truth is worth returning to more than once. It's easy to forget under pressure.",
        affirmation:
          'I am a new creature, and I will keep reminding myself of this truth until it feels as real as it already is.',
        sacredStep:
          "Write this week's verse on something you'll carry with you for the next seven days.",
      },
    ],
  },
  {
    weekNumber: 4,
    title: 'Week 4: I Am Not My Past',
    intro:
      'Shame has a way of turning your history into your identity, as if the worst thing you ever did is somehow the truest thing about you. This week draws a hard, necessary line between what happened to you and who you are.',
    reflection:
      "Your past is real. It happened. But it is not a life sentence, and it is not your identity — it's simply the road that brought you here. Next week, we come back to where this month began, standing fully in what it means to belong to God as His own child.",
    days: [
      {
        day: 1,
        scripture:
          '“Forgetting those things which are behind, and reaching forth unto those things which are before.”',
        reference: 'Philippians 3:13, KJV',
        truth: 'Looking back constantly keeps me from walking forward at all.',
        affirmation:
          "I am someone who is learning to release what's behind me. My past is part of my story, but it is not writing my future.",
        sacredStep:
          'Name one memory you keep replaying, and consciously set it down today.',
      },
      {
        day: 2,
        scripture:
          '“As far as the east is from the west, so far hath he removed our transgressions from us.”',
        reference: 'Psalm 103:12, KJV',
        truth: "God's removal of my past is total, not partial.",
        affirmation:
          "My transgressions have been removed as far as the east is from the west. I don't have to keep dragging them back to myself.",
        sacredStep:
          'Physically write down a past regret, then throw the paper away as an act of surrender.',
      },
      {
        day: 3,
        scripture:
          "“He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.”",
        reference: 'Psalm 23:3, KJV',
        truth:
          'Restoration means God is doing something with the wreckage, not just ignoring it.',
        affirmation:
          'My soul is being restored. What was damaged in my past is not the final word on my future.',
        sacredStep:
          'Do one thing today that feels like caring for your own soul — rest, prayer, or quiet.',
      },
      {
        day: 4,
        scripture: '“Neither do I condemn thee: go, and sin no more.”',
        reference: 'John 8:11, KJV',
        truth: 'Jesus separates the person from the sin every single time.',
        affirmation:
          'I am not condemned by my history. I am invited, like the woman in this story, to walk forward differently.',
        sacredStep:
          'Read John 8:1-11 today and picture yourself as the one being spoken to.',
      },
      {
        day: 5,
        scripture:
          '“And such were some of you: but ye are washed, but ye are sanctified, but ye are justified.”',
        reference: '1 Corinthians 6:11, KJV',
        truth: '"Such were" is past tense for a reason.',
        affirmation:
          'I was some of those things. I am washed, sanctified, and justified now. My past tense does not get to become my present tense.',
        sacredStep:
          "Speak this verse out loud over the specific past you're tempted to define yourself by.",
      },
      {
        day: 6,
        scripture:
          '“But this one thing I do, forgetting those things which are behind... I press toward the mark.”',
        reference: 'Philippians 3:13-14, KJV',
        truth:
          "Pressing forward is possible even while carrying the memory of what's behind me.",
        affirmation:
          "I am pressing toward what's ahead, not because my past didn't happen, but because it no longer gets to set the pace of my life.",
        sacredStep:
          'Set one small forward-looking goal today, unrelated to your past mistakes.',
      },
      {
        day: 7,
        scripture:
          '“Behold, I will do a new thing; now it shall spring forth; shall ye not know it?”',
        reference: 'Isaiah 43:19, KJV',
        truth:
          "God is more interested in what's next than in rehearsing what's already happened.",
        affirmation:
          'I am watching for the new thing God is doing in my life, even in the middle of an ordinary week.',
        sacredStep:
          'Look for one small sign of growth in yourself today and name it out loud.',
      },
    ],
  },
  {
    weekNumber: 5,
    title: "Week 5: I Am God's Child",
    intro:
      'We close out January where identity always has to land: family. Not the family that abandoned you, or the family you disappointed, but the family that adopted you permanently, no matter what.',
    reflection:
      "This month wasn't about becoming someone new by sheer effort. It was about recognizing who you already are in Christ — chosen, loved, made new, no longer defined by your past, and fully claimed as His child. Hold onto that identity, because next month we're going to need it. February is about grace, and grace only makes sense to someone who already knows they're loved enough to receive it.",
    days: [
      {
        day: 1,
        scripture:
          '“But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.”',
        reference: 'John 1:12, KJV',
        truth: "Becoming God's child was a gift I received, not a status I achieved.",
        affirmation:
          'I am a child of God because I received Him, not because I earned a spot in His family through good behavior.',
        sacredStep:
          'Say the word "received" out loud today as a reminder that grace was given, not earned.',
      },
      {
        day: 2,
        scripture:
          '“For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father.”',
        reference: 'Romans 8:15, KJV',
        truth:
          'Fear and shame are the language of bondage. Sonship speaks a different language entirely.',
        affirmation:
          'I am adopted, not enslaved. I can call God "Father" instead of living under fear that never lets me rest.',
        sacredStep:
          'Address your prayer today with the word "Father" and notice how it feels to say it.',
      },
      {
        day: 3,
        scripture:
          '“Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God: therefore the world knoweth us not.”',
        reference: '1 John 3:1, KJV',
        truth:
          "Being God's child sometimes means not being understood by everyone around me, and that's alright.",
        affirmation:
          "I am God's child even when the world doesn't recognize what that means. His approval was always enough on its own.",
        sacredStep:
          "Let go of one relationship's approval today that you've been chasing too hard.",
      },
      {
        day: 4,
        scripture:
          '“And if children, then heirs; heirs of God, and joint-heirs with Christ.”',
        reference: 'Romans 8:17, KJV',
        truth:
          "An inheritance isn't earned through performance. It's received through relationship.",
        affirmation:
          'I am an heir of God and a joint-heir with Christ. Whatever addiction stole from me, my inheritance in Him was never touched.',
        sacredStep:
          "List one thing addiction took from you, and name what God's inheritance restores in its place.",
      },
      {
        day: 5,
        scripture:
          '“Like as a father pitieth his children, so the LORD pitieth them that fear him.”',
        reference: 'Psalm 103:13, KJV',
        truth: "God's posture toward me isn't frustration. It's compassion.",
        affirmation:
          'I am shown compassion by a Father who understands my weakness better than I do, and loves me through it anyway.',
        sacredStep:
          'Show yourself the same compassion today that this verse describes God showing you.',
      },
      {
        day: 6,
        scripture:
          '“I will be a Father unto you, and ye shall be my sons and daughters, saith the Lord Almighty.”',
        reference: '2 Corinthians 6:18, KJV',
        truth: 'This promise was spoken directly, not vaguely, to me.',
        affirmation:
          'I am His son or daughter by direct promise, not by accident or afterthought. He said it plainly, and I believe it today.',
        sacredStep:
          'Read this verse aloud with your own name inserted where it says "sons and daughters."',
      },
      {
        day: 7,
        scripture: '“Ye are the children of the LORD your God.”',
        reference: 'Deuteronomy 14:1, KJV',
        truth: "Everything we've read this month builds toward this one simple sentence.",
        affirmation:
          'I am the child of the Lord my God. Chosen, loved, made new, released from my past, and held as family — this is who I am.',
        sacredStep:
          'Write one sentence summarizing what you now believe differently about your identity than you did on Day 1.',
      },
    ],
  },
];

export const CoreBookCoverReplica: React.FC<{
  size?: 'mini' | 'full';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ size = 'full', onClick }) => {
  const isMini = size === 'mini';

  const content = (
    <div
      className={`relative bg-[#1C2A39] text-white overflow-hidden select-none flex flex-col justify-between border border-[#D4AF37]/45 shadow-md ${
        isMini
          ? 'w-24 aspect-[3/4] rounded-lg p-2.5 shrink-0'
          : 'w-full max-w-[260px] mx-auto aspect-[3/4] rounded-xl p-5 shadow-xl'
      }`}
    >
      {/* Top Typography */}
      <div className="text-center">
        <div
          className={`font-serif font-bold tracking-wider uppercase leading-none text-white ${
            isMini ? 'text-[9px]' : 'text-lg sm:text-xl'
          }`}
        >
          SACRED STEPS
        </div>
        <div
          className={`font-serif italic text-[#D4AF37] leading-tight ${
            isMini ? 'text-[8px] mt-0.5' : 'text-base sm:text-lg mt-0.5'
          }`}
        >
          to Redemption
        </div>
        <div
          className={`mx-auto bg-[#D4AF37]/75 ${
            isMini ? 'w-10 h-px my-1' : 'w-20 h-0.5 my-2'
          }`}
        />
        <div
          className={`font-sans font-semibold tracking-[0.14em] uppercase text-white/95 ${
            isMini ? 'text-[5px]' : 'text-[9px] sm:text-[10px]'
          }`}
        >
          365 BIBLICAL AFFIRMATIONS
        </div>
      </div>

      {/* Central Golden Rising Sun + Cross + Stepping-Stone Path SVG matching Page 1 */}
      <div className="flex-1 flex items-center justify-center my-1">
        <svg
          viewBox="0 0 200 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Sun rays */}
          <line x1="100" y1="6" x2="100" y2="26" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="12" x2="77" y2="30" stroke="#D4AF37" strokeWidth="2.3" strokeLinecap="round" />
          <line x1="132" y1="12" x2="123" y2="30" stroke="#D4AF37" strokeWidth="2.3" strokeLinecap="round" />
          <line x1="42" y1="28" x2="57" y2="42" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="158" y1="28" x2="143" y2="42" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="22" y1="51" x2="41" y2="59" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <line x1="178" y1="51" x2="159" y2="59" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="74" x2="36" y2="75" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="184" y1="74" x2="164" y2="75" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />

          {/* Golden Sun Dome */}
          <path d="M52 80 A48 48 0 0 1 148 80 Z" fill="#D4AF37" />

          {/* Cross Silhouetted in Sun */}
          <rect x="96.5" y="42" width="7" height="38" fill="#1C2A39" />
          <rect x="86" y="51" width="28" height="6.5" fill="#1C2A39" />

          {/* Horizon Line */}
          <line x1="12" y1="80" x2="188" y2="80" stroke="#D4AF37" strokeWidth="1.6" />

          {/* Winding White Stepping-Stone Path */}
          <path
            d="M100 80 C112 88, 122 93, 110 100 C94 108, 60 112, 82 128 L154 128 C126 116, 128 106, 118 98 C110 92, 108 86, 101 80 Z"
            fill="#F9F6F0"
          />

          {/* Stepping Stones */}
          <ellipse cx="105" cy="87" rx="2.5" ry="1.2" fill="#1C2A39" />
          <ellipse cx="110" cy="92" rx="3" ry="1.4" fill="#1C2A39" />
          <ellipse cx="102" cy="98" rx="4" ry="1.8" fill="#1C2A39" />
          <ellipse cx="90" cy="105" rx="5.5" ry="2.2" fill="#1C2A39" />
          <ellipse cx="87" cy="113" rx="7" ry="2.6" fill="#1C2A39" />
          <ellipse cx="98" cy="121" rx="8.5" ry="3.2" fill="#1C2A39" />
        </svg>
      </div>

      {/* Bottom Author Block */}
      <div className="border-t border-[#D4AF37]/80 pt-1.5 text-center">
        {!isMini && (
          <p className="font-serif italic text-[9px] text-white/85 leading-snug mb-1.5">
            A 12-Month Guided Devotional to Renew Your Mind, Strengthen Your Faith, and Walk in God&apos;s Freedom
          </p>
        )}
        <div
          className={`font-sans font-bold tracking-[0.16em] uppercase text-[#D4AF37] ${
            isMini ? 'text-[5.5px]' : 'text-[11px]'
          }`}
        >
          C. LAMONT PATRICK
        </div>
        {!isMini && (
          <div className="text-[7px] tracking-[0.22em] uppercase text-white/60 mt-0.5">
            KYA DAISY PUBLISHING
          </div>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative block text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
        title="Download 30-Page Preview Sample PDF"
      >
        {content}
      </button>
    );
  }

  return content;
};

export const CoreSampleModal: React.FC<CoreSampleModalProps> = ({
  isOpen,
  onClose,
  onJoinWaitlist,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'toc' | 'january' | 'pdf'>('overview');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
  }, [isOpen, activeTab, selectedWeekIndex, selectedDayIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeWeek = JANUARY_SAMPLE_WEEKS[selectedWeekIndex];
  const activeDay = activeWeek.days[selectedDayIndex];
  const itemKey = `w${activeWeek.weekNumber}-d${activeDay.day}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${activeDay.affirmation}" — ${activeDay.reference}`
      );
      setCopiedId(itemKey);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleToggleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingId === itemKey) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeDay.affirmation);
    utterance.rate = 0.88;
    utterance.pitch = 0.98;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(itemKey);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="core-sample-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#1C2A39]/75 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-[#F9F6F0] rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Modal Header */}
        <div className="bg-[#1C2A39] text-[#F9F6F0] px-5 sm:px-7 py-4 flex items-center justify-between gap-4 border-b border-[#D4AF37]/30 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
              <span>The Core Devotional</span>
              <span aria-hidden="true">·</span>
              <span>30-Page Preview Sample</span>
            </div>
            <h2
              id="core-sample-modal-title"
              className="text-lg sm:text-2xl font-serif font-bold text-white truncate mt-0.5"
            >
              Sacred Steps to Redemption: 365 Biblical Affirmations
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={CORE_PREVIEW_PDF_PATH}
              download={CORE_PREVIEW_PDF_FILENAME}
              onClick={downloadCorePreviewPdf}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#BF9C2D] text-[#1C2A39] font-bold text-xs transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Download 30-Page Sample PDF</span>
              <span className="sm:hidden">Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close sample preview modal"
              className="p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 sm:px-7 pt-2.5 bg-white/80 border-b border-[#1C2A39]/10 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/65 hover:text-[#1C2A39]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Inside the Book</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('toc')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'toc'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/65 hover:text-[#1C2A39]'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>12-Month Contents</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('january')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'january'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/65 hover:text-[#1C2A39]'
              }`}
            >
              <span>Sample Month: January</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pdf'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/65 hover:text-[#1C2A39]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full 30-Page PDF</span>
            </button>
          </div>

          <div className="text-xs text-[#7A8B7B] font-serif italic pb-2 hidden md:block">
            Pages 1–30 · Official KDP Sample Edition
          </div>
        </div>

        {/* TAB 1: INSIDE THE BOOK OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left: Book Cover Replica & Quick Specs */}
              <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
                <CoreBookCoverReplica
                  size="full"
                  onClick={(e) => downloadCorePreviewPdf(e)}
                />
                <div className="text-xs text-[#1C2A39]/75 space-y-1">
                  <p className="font-semibold text-[#1C2A39]">
                    Free 30-Page Downloadable Sample
                  </p>
                  <p>
                    Includes Dedication · Table of Contents · Foreword · My Story · Full Month of January (35 Devotionals)
                  </p>
                </div>
              </div>

              {/* Right: Dedication, Author Story Excerpt & Actions */}
              <div className="md:col-span-7 space-y-5">
                <div className="p-5 rounded-xl bg-white border border-[#1C2A39]/10 space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A8B7B] block">
                    Dedication · Page 3
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-[#1C2A39] leading-relaxed">
                    &ldquo;To everyone still walking it out — the ones who haven&apos;t given up, even on the days it would have been easier to. This one is for you. And to the God who meets us in the broken places and never once asks us to clean up first.&rdquo;
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF6] border border-[#1C2A39]/10 space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A8B7B] block">
                    Why This Book Exists · Page 8
                  </span>
                  <p className="text-sm sm:text-base text-[#2B2B2B]/90 leading-relaxed">
                    &ldquo;I don&apos;t speak about recovery because I studied it. I speak about it because I lived it. For more than twenty years, addiction had the final word in my story... This book exists because I needed it and it didn&apos;t exist yet — not in a way that spoke my language. Not a clinical checklist. Not a preacher&apos;s sermon aimed at people who&apos;ve never stood where I stood. Just Scripture, honest truth, and one small step a day, from someone who&apos;s still walking this road right alongside you.&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-[#1C2A39]">
                    — C. Lamont Patrick
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={CORE_PREVIEW_PDF_PATH}
                    download={CORE_PREVIEW_PDF_FILENAME}
                    onClick={downloadCorePreviewPdf}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1C2A39] hover:bg-[#2A3C50] text-[#D4AF37] font-bold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 30-Page Sample PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveTab('january')}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#FAF3E0] text-[#1C2A39] border border-[#1C2A39]/15 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Read January Sample</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('toc')}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#FAF3E0] text-[#1C2A39] border border-[#1C2A39]/15 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore 12 Months</span>
                  </button>
                </div>
              </div>
            </div>

            {/* What's Inside the 30-Page Sample */}
            <div className="pt-6 border-t border-[#1C2A39]/10">
              <h3 className="text-base font-serif font-bold text-[#1C2A39] mb-4">
                What You Will Find Inside This 30-Page Preview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    pages: 'Pages 4–6',
                    title: '12-Month Table of Contents',
                    desc: 'All 52 weekly themes from Identity in January through Redemption in December.',
                  },
                  {
                    pages: 'Pages 7–13',
                    title: 'Story & Sacred S.T.E.P.™ Intro',
                    desc: 'Foreword, C. Lamont Patrick’s recovery testimony, and why Scripture-rooted affirmations renew the mind.',
                  },
                  {
                    pages: 'Pages 14–27',
                    title: 'Complete January Devotional',
                    desc: 'Month introduction (Isaiah 43:1) plus all 5 full weeks of daily S.T.E.P. readings and reflections.',
                  },
                  {
                    pages: 'Pages 28–30',
                    title: 'Continuation Plan & Prayer',
                    desc: 'Month-end self-check, 3-step continuation plan, and closing prayer for Identity.',
                  },
                ].map((block) => (
                  <div
                    key={block.title}
                    className="p-4 rounded-xl bg-white border border-[#1C2A39]/10 space-y-1.5"
                  >
                    <span className="text-[11px] font-semibold text-[#7A8B7B]">
                      {block.pages}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#1C2A39]">
                      {block.title}
                    </h4>
                    <p className="text-xs text-[#2B2B2B]/80 leading-relaxed">
                      {block.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL 12-MONTH TABLE OF CONTENTS */}
        {activeTab === 'toc' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1C2A39]/10 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A8B7B]">
                  Table of Contents · Pages 4–6
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1C2A39] mt-1">
                  The Complete 12-Month Devotional Journey
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2B2B]/80 mt-1">
                  52 weeks · 12 monthly themes · 365 daily Biblical affirmations + 12-Verse Memory Challenge &amp; Simple Prayer Tracker
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('january')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1C2A39] text-[#D4AF37] text-xs font-bold hover:bg-[#2A3C50] transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <span>Open Full January Sample</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MONTH_ROADMAP.map((m) => (
                <div
                  key={m.month}
                  className={`p-4 rounded-xl border transition-colors ${
                    m.includedInPreview
                      ? 'bg-[#FAF3E0] border-[#D4AF37]/60'
                      : 'bg-white border-[#1C2A39]/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8B7B]">
                      {m.month} · {m.theme}
                    </span>
                    {m.includedInPreview && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('january')}
                        className="text-[11px] font-bold text-[#1C2A39] underline decoration-[#D4AF37] underline-offset-2 cursor-pointer"
                      >
                        Included in Sample
                      </button>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1C2A39] mb-2.5">
                    {m.subtitle}
                  </h4>
                  <ul className="space-y-1 text-xs text-[#2B2B2B]/85">
                    {m.weeks.map((w) => (
                      <li key={w} className="leading-snug">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMPLETE JANUARY INTERACTIVE SAMPLE */}
        {activeTab === 'january' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Monthly Scripture Header */}
            <div className="px-5 sm:px-7 py-3 bg-[#FAF3E0] border-b border-[#D4AF37]/30 text-xs sm:text-sm text-[#1C2A39] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
              <p className="font-serif italic">
                &ldquo;Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine.&rdquo; — Isaiah 43:1 (KJV)
              </p>
              <span className="text-[11px] font-semibold text-[#7A8B7B] uppercase tracking-wider shrink-0">
                January · Identity (Pages 14–29)
              </span>
            </div>

            {/* Week Selector */}
            <div className="px-5 sm:px-7 pt-3.5 pb-2 bg-white/70 border-b border-[#1C2A39]/10 shrink-0 space-y-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {JANUARY_SAMPLE_WEEKS.map((week, idx) => (
                  <button
                    key={week.weekNumber}
                    type="button"
                    onClick={() => {
                      setSelectedWeekIndex(idx);
                      setSelectedDayIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      selectedWeekIndex === idx
                        ? 'bg-[#1C2A39] text-[#D4AF37] font-bold shadow-xs'
                        : 'bg-white text-[#1C2A39]/80 hover:bg-[#FAF3E0] border border-[#1C2A39]/10'
                    }`}
                  >
                    {week.title}
                  </button>
                ))}
              </div>

              {/* Day Selector within Week */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {activeWeek.days.map((d, idx) => (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0 tabular-nums ${
                      selectedDayIndex === idx
                        ? 'bg-[#D4AF37] text-[#1C2A39] font-bold'
                        : 'bg-[#F9F6F0] text-[#1C2A39]/75 hover:bg-[#FAF3E0]'
                    }`}
                  >
                    Day {d.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Week Intro + Active Day S.T.E.P. Content */}
            <div className="p-5 sm:p-8 space-y-5 flex-1">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#7A8B7B]">
                  {activeWeek.title} · Day {activeDay.day} of 7
                </div>
                <p className="text-xs sm:text-sm text-[#2B2B2B]/80 italic font-serif leading-relaxed">
                  {activeWeek.intro}
                </p>
              </div>

              <div className="space-y-4">
                {/* S */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#D4AF37]/40 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center text-xs font-bold font-serif">
                      S
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      Scripture
                    </span>
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-[#1C2A39] leading-relaxed">
                    {activeDay.scripture}
                  </blockquote>
                  <span className="text-xs font-semibold text-[#7A8B7B] mt-2 block">
                    — {activeDay.reference}
                  </span>
                </div>

                {/* T */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#7A8B7B]/30 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded bg-[#7A8B7B] text-white flex items-center justify-center text-xs font-bold font-serif">
                      T
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      Truth
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#2B2B2B] leading-relaxed">
                    {activeDay.truth}
                  </p>
                </div>

                {/* E */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/50 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-[#D4AF37] text-[#1C2A39] flex items-center justify-center text-xs font-bold font-serif">
                        E
                      </span>
                      <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                        Affirmation (Speak Out Loud)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                        <button
                          type="button"
                          onClick={handleToggleSpeak}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white border border-[#D4AF37]/40 text-[11px] font-semibold text-[#1C2A39] transition-colors cursor-pointer"
                        >
                          {speakingId === itemKey ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white border border-[#D4AF37]/40 text-[11px] font-semibold text-[#1C2A39] transition-colors cursor-pointer"
                      >
                        {copiedId === itemKey ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#7A8B7B]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#7A8B7B]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#1C2A39] leading-relaxed font-bold">
                    &ldquo;{activeDay.affirmation}&rdquo;
                  </p>
                </div>

                {/* P */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#1C2A39]/20 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded bg-[#1C2A39] text-white flex items-center justify-center text-xs font-bold font-serif">
                      P
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      Sacred Step
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#2B2B2B] leading-relaxed">
                    {activeDay.sacredStep}
                  </p>
                </div>

                {/* Weekly Reflection when viewing Day 7 */}
                {activeDay.day === 7 && (
                  <div className="p-4 rounded-xl bg-[#FCFAF6] border border-[#1C2A39]/15 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8B7B] block">
                      Weekly Reflection
                    </span>
                    <p className="text-xs sm:text-sm font-serif italic text-[#1C2A39] leading-relaxed">
                      {activeWeek.reflection}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EMBEDDED FULL 30-PAGE PDF VIEWER */}
        {activeTab === 'pdf' && (
          <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 bg-[#EFE9DC]/30">
            <div className="flex items-center justify-between pb-3 gap-3">
              <span className="text-xs text-[#1C2A39]/80 font-medium">
                Sacred Steps to Redemption: 365 Biblical Affirmations — KDP Preview Sample (30 Pages)
              </span>
              <a
                href={CORE_PREVIEW_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#1C2A39] hover:text-[#D4AF37] font-semibold underline underline-offset-2 whitespace-nowrap"
              >
                <span>Open in Full Browser Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex-1 w-full rounded-xl overflow-hidden border border-[#1C2A39]/15 shadow-inner bg-white">
              <iframe
                src={`${CORE_PREVIEW_PDF_PATH}#view=FitH`}
                title="Sacred Steps to Redemption 365 Biblical Affirmations 30-Page Preview PDF"
                className="w-full h-full min-h-[500px]"
              />
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3 bg-[#1C2A39] text-white/85 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 border-t border-white/10">
          <span className="font-serif italic text-center sm:text-left">
            One Scripture. One Truth. One Affirmation. One Sacred Step.
          </span>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onJoinWaitlist();
              }}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Join VIP Waitlist</span>
            </button>
            <a
              href={CORE_PREVIEW_PDF_PATH}
              download={CORE_PREVIEW_PDF_FILENAME}
              onClick={downloadCorePreviewPdf}
              className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:underline font-bold cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 30-Page PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
