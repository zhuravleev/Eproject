import axios from "axios"

export default class EService {
    static async getClients(props){
        const response = await fetch("https://esoft.onrender.com/api/agent/all", props)
        return response.data
    }
}