const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_IP || "http://localhost:4000";
const apiBase = `${BASE_URL}/api/v1/games`;

interface ApiCallOptions {
    method?: string;
    body?: object;
    query?: Record<string, string | number | undefined | null>;
    headers?: Record<string, string>;
}

async function apiCall(endpoint: string, { method = 'GET', body, query, headers }: ApiCallOptions = {}) {
    let url = `${apiBase}/${endpoint}`;

    if (query && Object.keys(query).length > 0) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null) {
                queryParams.append(key, String(value));
            }
        }
        url += `?${queryParams.toString()}`;
    }

    let fetchOptions: RequestInit = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {})
        }
    };

    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    return response.json();
}

export async function getPlayerCount(appid: number) {
    return apiCall(`get_player_count/${appid}`)
}
export async function getSteamGame(search: string) {
    return apiCall(`search_steam/${search}`)
}
export async function fillGameData() {
    return apiCall('fill_game_data', {
        method: 'POST'
    })
}
export async function getAllGames() {
    return apiCall('get_all_games')
}

export async function getGameDetails(appid: string | undefined) {
    if (appid === undefined) return
    return apiCall(`get_game_details/${appid}`)
}