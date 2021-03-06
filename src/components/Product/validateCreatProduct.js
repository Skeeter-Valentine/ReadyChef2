export default function validateCreateProduct(values){
    let errors={}

    if (!values.title){
        errors.title="A title is required."
    }

    if (!values.description){
        errors.description="A description is required."
    } else if (values.description.length<10) {
        errors.description="Description must be at least 10 characters."
    }

    if (!values.url){
        errors.url="A URL is required."
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.URL="URL must be valid"
    }
    return errors
}