import assert from 'node:assert/strict';
import test from 'node:test';

import { getCursorPaginator } from '../dist/nodes/ScrapeCreators/functions.js';

async function paginate(responses) {
	const calls = [];
	const paginator = getCursorPaginator('items', 'next_max_id');
	const result = await paginator.call(
		{
			getNodeParameter: () => 10,
			makeRoutingRequest: async (requestOptions) => {
				calls.push({ ...requestOptions.options.qs });
				const response = responses.shift();
				if (!response) throw new Error('Paginator made an unexpected extra request');
				return [{ json: response }];
			},
		},
		{ options: { qs: {} } },
	);
	return { calls, result };
}

test('stops when a later page omits its cursor', async () => {
	const { calls, result } = await paginate([
		{ items: [{ id: 1 }], next_max_id: 'cursor-1' },
		{ items: [{ id: 2 }] },
	]);

	assert.equal(calls.length, 2);
	assert.equal(calls[1].next_max_id, 'cursor-1');
	assert.deepEqual(result[0].json.items, [{ id: 1 }, { id: 2 }]);
});

test('stops when the API returns the cursor that was just requested', async () => {
	const { calls, result } = await paginate([
		{ items: [{ id: 1 }], next_max_id: 'cursor-1' },
		{ items: [{ id: 2 }], next_max_id: 'cursor-1' },
	]);

	assert.equal(calls.length, 2);
	assert.deepEqual(result[0].json.items, [{ id: 1 }, { id: 2 }]);
});

test('stops after an empty page even when it supplies a new cursor', async () => {
	const { calls, result } = await paginate([
		{ items: [{ id: 1 }], next_max_id: 'cursor-1' },
		{ items: [], next_max_id: 'cursor-2' },
	]);

	assert.equal(calls.length, 2);
	assert.deepEqual(result[0].json.items, [{ id: 1 }]);
});
