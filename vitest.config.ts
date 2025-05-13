import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            coverage: {
                include: [
                    'src/components/atoms/**',
                    'src/components/molecules/**',
                    'src/components/organisms/**',
                ],
            },
            root: fileURLToPath(new URL('./', import.meta.url)),
        },
    }),
);
