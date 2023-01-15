import { walk } from './utils';
import type * as t from 'resolve.exports';

export { legacy } from './legacy';

type Output = string[] | string;

export function exports(pkg: t.Package, input?: string, options?: t.Options): Output | void {
	let map = pkg.exports,
		k: string;

	if (map) {
		if (typeof map === 'string') {
			map = { '.': map };
		} else for (k in map) {
			// convert {conditions} to "."={condtions}
			if (k[0] !== '.') map = { '.': map };
			break;
		}

		return walk(pkg.name, map, input||'.', options);
	}
}

export function imports(pkg: t.Package, input: string, options?: t.Options): Output | void {
	if (pkg.imports) return walk(pkg.name, pkg.imports, input, options);
}
