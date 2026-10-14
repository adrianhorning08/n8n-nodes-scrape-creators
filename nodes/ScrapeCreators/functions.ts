import {
	INodeExecutionData,
	IExecutePaginationFunctions,
	DeclarativeRestApiSettings,
	IDataObject,
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
} from 'n8n-workflow';

// got this fromhttps://github.com/n8n-io/n8n/blob/b1305fe5f146bd590fc7caab568d8dba1568cea7/packages/nodes-base/nodes/Okta/UserFunctions.ts

export const getCursorPaginator = (
	dataProperty: string, // e.g. 'posts'
	cursorProperty: string, // e.g. 'after' or 'paging.max_cursor'
) => {
	// TODO: what if the user didn't specify a limit?

	return async function cursorPagination(
		this: IExecutePaginationFunctions,
		requestOptions: DeclarativeRestApiSettings.ResultOptions,
	): Promise<INodeExecutionData[]> {
		if (!requestOptions.options.qs) {
			requestOptions.options.qs = {};
		}

		let count = 0;

		let items: INodeExecutionData[] = [
			{
				json: {
					[dataProperty]: [] as IDataObject[],
				} as IDataObject,
			},
		];
		let responseData: INodeExecutionData[];

		let nextCursor: string | undefined = undefined;
		const limit = (this.getNodeParameter('limit', true) as number) || 10;
		// Keep a bad upstream cursor from turning one n8n execution into unbounded requests.
		const maxPages = 1000;
		let pageCount = 0;
		let receivedItems = false;

		// Get the last part of the cursor property path for the query string
		const queryStringCursorProperty = cursorProperty.split('.').pop() || cursorProperty;

		do {
			const requestedCursor: string | undefined = nextCursor;
			requestOptions.options.qs.limit = limit;
			requestOptions.options.qs[queryStringCursorProperty] = nextCursor;
			responseData = await this.makeRoutingRequest(requestOptions);
			pageCount += 1;
			console.log('responseData', responseData);

			const actualResponse = responseData[responseData.length - 1]?.json as IDataObject;
			receivedItems = false;
			if (responseData.length > 0) {
				// Handle nested cursor property path
				const cursorPath = cursorProperty.split('.');
				let possibleNewCursor: unknown = actualResponse;
				for (const path of cursorPath) {
					possibleNewCursor = (possibleNewCursor as IDataObject)?.[path];
				}

				console.log('possibleNewCursor', possibleNewCursor);

				const newCursor = possibleNewCursor ? String(possibleNewCursor) : undefined;
				nextCursor = newCursor && newCursor !== requestedCursor ? newCursor : undefined;
			}

			if (Array.isArray(actualResponse?.[dataProperty])) {
				receivedItems = actualResponse[dataProperty].length > 0;
				count += actualResponse[dataProperty].length;
				const currentData = items[0].json[dataProperty] as IDataObject[];
				items[0].json[dataProperty] = [...currentData, ...actualResponse[dataProperty]];
			}
		} while (
			limit > count &&
			nextCursor &&
			nextCursor !== 'undefined' &&
			nextCursor !== 'null' &&
			receivedItems &&
			pageCount < maxPages
		);

		items[0].json[dataProperty] = (items[0].json[dataProperty] as IDataObject[])?.slice(0, limit);

		return items;
	};
};

export async function simplifyIGTranscriptResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	try {
		const transcript = (items[0].json.transcripts as IDataObject[])?.[0]?.text;
		return [
			{
				json: {
					transcript: transcript,
				},
			},
		];
	} catch (error) {
		console.error('Error simplifying IG transcript response', error.message);
		return [];
	}
}
