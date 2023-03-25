import axios  from "../axios";
const getAllMembers = ()=>{
    return axios.get(`/api/get-all-members`)
}
const createNewMembers = (data)=>{
    return axios.post(`/api/add-members`,data)
}
const deleteMembersService = (id)=>{
    return axios.delete(`/api/delete-members`,{data:{id:id}})
}
const editMembersService = (imputData)=>{
    return axios.put(`/api/edit-members`,imputData)
}

export{
    getAllMembers,
    createNewMembers,
    deleteMembersService,
    editMembersService
}