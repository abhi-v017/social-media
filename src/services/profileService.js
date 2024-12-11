import axios from "axios";
export class ProfileService {
    async CreatePostService(data) {
        const options = {
            method: 'POST',
            url: 'api/v1/social-media/posts',
            headers: { accept: 'application/json', 'content-type': 'multipart/form-data' },
            data: data
        }
        try {
            const { data } = await axios.request(options)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Post Creation Failed!!');
        }
    }
    async getProfileService() {
        const options = {
            method: 'GET',
            url: 'api/v1/social-media/profile',
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
    async updateService(data) {
        const options = {
            method: 'PATCH',
            url: 'api/v1/social-media/profile',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            data: data
        };

        try {
            console.log(options)
            const { data } = await axios.request(options);
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
    async getAllPosts() {
        const options = {
            method: 'GET',
            url: 'api/v1/social-media/posts',
            params: { page: '1', limit: '10' },
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getmyPosts() {
        const options = {
            method: 'GET',
            url: '/api/v1/social-media/posts/get/my',
            params: { page: '1', limit: '10' },
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
    async getProfileByUsername(username) {
        const options = {
            method: 'GET',
            url: `/api/v1/social-media/profile/u/${username}`,
            headers: { accept: 'application/json' }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getPostByUsername(username) {
        const options = {
            method: 'GET',
            url: `/api/v1/social-media/posts/get/u/${username}`,
            params: { page: '1', limit: '6' },
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
}

const profileService = new ProfileService();
export default profileService