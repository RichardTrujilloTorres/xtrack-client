import axios from 'axios';
import {vueAuth} from "../main";


/**
 * RESTful API resource.
 */
class Resource {

    /**
     * @param {string} baseURL The Base API URL
     */
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL
        })

        // configure authentication headers
        this.api.interceptors.request.use((config) => {
            if (vueAuth.isAuthenticated()) {
                config.headers['Authorization'] = [
                    vueAuth.options.tokenType, vueAuth.getToken()
                ].join(' ')
            } else {
                delete config.headers['Authorization']
            }

            return config
        })
    }

    /**
     * Resource listing.
     *
     * @returns {Promise<AxiosPromise<any>>}
     */
    async index() {
        return await this.api.get('/')
    }

    /**
     * Retrieves the resource by its ID.
     *
     * @param {integer} id
     * @returns {Promise<any>}
     */
    async show(id) {
        return await this.api.get(`${id}`)
    }

    /**
     * Creates a new resource.
     *
     * @param {array|Object} data
     * @returns {Promise<any>}
     */
    async store(data) {
        return await this.api.post('/', data)
    }

    /**
     * Updates the specified resource.
     *
     * @param {integer} id
     * @param {array|Object} data
     * @returns {Promise<any>}
     */
    async update(id, data) {
        return await this.api.put(`${id}`, data)
    }

    /**
     * Removes the specified resource.
     *
     * @param {integer} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        return await this.api.delete(`${id}`)
    }
}

export default Resource
