const DEFAULT_RENDER_BACKEND = 'https://solar-pannel-store.onrender.com';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
	typeof window !== 'undefined' && /vercel\.app$/.test(window.location.hostname)
		? DEFAULT_RENDER_BACKEND
		: 'http://localhost:5000'
);
