import axios from "axios";


export class FollowService {
    async followUserService(userId) {
        const options = {
            method: 'POST',
            url: `/api/v1/social-media/follow/${userId}`,
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async followerListService(username) {
        const options = {
            method: 'GET',
            url: `/api/v1/social-media/follow/list/followers/${username}`,
            params: { page: '1', limit: '5' },
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async followingListService(username) {
        const options = {
            method: 'GET',
            url: `/api/v1/social-media/follow/list/following/${username}`,
            params: { page: '1', limit: '5' },
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
}

const followService = new FollowService();
export default followService