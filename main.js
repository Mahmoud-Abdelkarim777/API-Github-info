const Name = document.querySelectorAll('.content-user');
const Avatar_user = document.getElementById('avatar-user');
const Name_user = document.getElementById('name-user');
const Following = document.getElementById('following');
const Followers = document.getElementById('followers');
const Repo = document.getElementById('repo-container');
const Repos = document.getElementById('num-repo');
const btn = document.getElementById('try');
Name.forEach(element => {
    element.style.display = "none";
});
btn.addEventListener('click', async () => {
    const { value: username } = await Swal.fire({
        title: "Submit your Github username",
        input: "text",
        inputPlaceholder: "Enter your Github username",
        showCancelButton: true,
        confirmButtonText: "Look up",
    });
    if (username) {
        getUser(username);
        getrepo(username)
        Name.forEach(element => {
            element.style.display = "block"; 
        });
    } else {
        Swal.fire("No username entered!");
    }
})
async function getUser(user) {
    try {
        const response = await axios.get(`https://api.github.com/users/${user}`);
        data = response.data
        console.log(data);
        Avatar_user.src = data.avatar_url
        Avatar_user.alt = data.login;
        Avatar_user.style.width = "300px";
        Name_user.innerHTML = data.name || "No name provided"
        Following.innerHTML = data.following
        Followers.innerHTML = data.followers
        Repos.innerHTML = data.public_repos
    } catch (error) {
        Name.forEach(element => {
            element.style.display = "block";
        });
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter valid username",
        });
    }
}
async function getrepo(repo) {
    try {
        const response = await axios.get(`https://api.github.com/users/${repo}/repos`);
        data = response.data
        console.log(data);
        Repo.innerHTML = ''; 
        data.forEach(element =>{
            const repoDiv = document.createElement('div');
            const repoLink = document.createElement('a');
            repoLink.href = element.clone_url;
            repoLink.target = "_blank";
            repoLink.innerText = element.name;
            repoDiv.classList.add("mb-4","bg-sub_main-800", "p-4");
            repoDiv.appendChild(repoLink);
            Repo.appendChild(repoDiv);  
        })
    } catch (error) {
        Name.forEach(element => {
            element.style.display = "block";
        });
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter valid username",
        });
    }
}

