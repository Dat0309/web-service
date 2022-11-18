var courseAPI = "http://localhost:3000/course";

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}

start();

function getCourses(callback) {
    fetch(courseAPI)
        .then(res => res.json())
        .then(callback)
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI, options)
        .then(res => res.json())
        .then(callback)
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(course => {
        return `
            <li>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = (e) => {
        e.preventDefault();
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, () => getCourses(renderCourses));
    }
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseAPI + `/${id}`, options)
        .then(res => res.json())
        .then(() => {})
}