import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import { tags } from '@/lib/api';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <TagsMenu tags={tags} />
        </ul>
      </nav>
    </header>
  );
}
