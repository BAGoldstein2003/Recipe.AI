export default function Error({isError}) {
    if (isError) {
        window.alert("Error trying to create recipe. Please Try Again.")
    }
}