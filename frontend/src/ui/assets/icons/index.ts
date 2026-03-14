import ArrowTail from './arrow-tail.svg?react'
import Arrow from './arrow.svg?react'
import Book from './book.svg?react'
import Brain from './brain.svg?react'
import BurgerMenu from './burger-menu.svg?react'
import Cancel from './cancel.svg?react'
import CaseSensitive from './case-sensitive.svg?react'
import Empty from './empty.svg?react'
import Error from './error.svg?react'
import Eye from './eye.svg?react'
import GithubContained from './github-contained.svg?react'
import Github from './github.svg?react'
import Google from './google.svg?react'
import Imdb from './imdb.svg?react'
import Info from './info.svg?react'
import Kinopoisk from './kinopoisk.svg?react'
import Login from './login.svg?react'
import Moon from './moon.svg?react'
import Movie from './movie.svg?react'
import Popular from './popular.svg?react'
import Profile from './profile.svg?react'
import Search from './search.svg?react'
import Settings from './settings.svg?react'
import Star from './star.svg?react'
import Subtitle from './subtitle.svg?react'
import Sun from './sun.svg?react'
import Telegram from './telegram.svg?react'
import Translate from './translate.svg?react'
import Trash from './trash.svg?react'
import WholeWord from './whole-word.svg?react'
import YaTranslate from './ya-translate.svg?react'
import YouTube from './youtube.svg?react'

export const Icons = {
	Arrow,
	ArrowTail,
	Book,
	Brain,
	BurgerMenu,
	Cancel,
	CaseSensitive,
	Empty,
	Error,
	Eye,
	Github,
	GithubContained,
	Google,
	Imdb,
	Info,
	Kinopoisk,
	Login,
	Moon,
	Movie,
	Popular,
	Profile,
	Search,
	Settings,
	Star,
	Subtitle,
	Sun,
	Telegram,
	Translate,
	Trash,
	WholeWord,
	YaTranslate,
	YouTube
}

export type IconType = (typeof Icons)[keyof typeof Icons]
