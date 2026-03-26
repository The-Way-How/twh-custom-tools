exports.main = async (context, sendResponse) => {
  const TABLE_ID = '199622296'; 
  const ROW_ID = '208783972746'; 
  const token = process.env.HUBDB_LAUNCH_TOKEN;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const patchReq = await fetch(`https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/rows/${ROW_ID}/draft`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ values: { is_live: 1 } }) 
    });

    if (!patchReq.ok) {
      const errDetails = await patchReq.json();
      return sendResponse({ body: { step: "PATCH", error: errDetails }, statusCode: 400 });
    }

    const pubReq = await fetch(`https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/draft/push-live`, {
      method: 'POST',
      headers
    });

    if (!pubReq.ok) {
      const errDetails = await pubReq.json();
      return sendResponse({ body: { step: "PUBLISH", error: errDetails }, statusCode: 400 });
    }

    sendResponse({ body: { status: 'success' }, statusCode: 200 });
  } catch (e) {
    sendResponse({ body: { error: e.message }, statusCode: 500 });
  }
};