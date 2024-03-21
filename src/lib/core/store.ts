// store.ts
import { writable } from 'svelte/store';

// Initial title value
const initialTitle = 'Home Page';
const showBack = false;
// Create a writable store for the title
const initData = {title: initialTitle, showBack: showBack};
export const data = writable(initData);
