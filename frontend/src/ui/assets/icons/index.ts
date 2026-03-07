import ArrowTailIcon from './arrow-tail.svg?react'
import ArrowIcon from './arrow.svg?react'
import BookIcon from './book.svg?react'
import BrainIcon from './brain.svg?react'
import BurgerMenuIcon from './burger-menu.svg?react'
import CancelIcon from './cancel.svg?react'
import CaseSensitiveIcon from './case-sensitive.svg?react'
import EmptyIcon from './empty.svg?react'
import ErrorIcon from './error.svg?react'
import EyeIcon from './eye.svg?react'
import GithubIcon from './github.svg?react'
import GoogleIcon from './google.svg?react'
import ImdbIcon from './imdb.svg?react'
import InfoIcon from './info.svg?react'
import Kinopoisk from './kinopoisk.svg?react'
import LoginIcon from './login.svg?react'
import MoonIcon from './moon.svg?react'
import MovieIcon from './movie.svg?react'
import PopularIcon from './popular.svg?react'
import ProfileIcon from './profile.svg?react'
import SearchIcon from './search.svg?react'
import SettingsIcon from './settings.svg?react'
import StarIcon from './star.svg?react'
import SubtitleIcon from './subtitle.svg?react'
import SunIcon from './sun.svg?react'
import TranslateIcon from './translate.svg?react'
import TrashIcon from './trash.svg?react'
import WholeWordIcon from './whole-word.svg?react'
import YaTranslate from './ya-translate.svg?react'

export const Icons = {
	ArrowIcon,
	ArrowTailIcon,
	BookIcon,
	BrainIcon,
	BurgerMenuIcon,
	CancelIcon,
	CaseSensitiveIcon,
	EmptyIcon,
	ErrorIcon,
	EyeIcon,
	GithubIcon,
	GoogleIcon,
	ImdbIcon,
	InfoIcon,
	Kinopoisk,
	LoginIcon,
	MoonIcon,
	MovieIcon,
	PopularIcon,
	ProfileIcon,
	SearchIcon,
	SettingsIcon,
	StarIcon,
	SubtitleIcon,
	SunIcon,
	TranslateIcon,
	TrashIcon,
	WholeWordIcon,
	YaTranslate
}

export type IconType = (typeof Icons)[keyof typeof Icons]
