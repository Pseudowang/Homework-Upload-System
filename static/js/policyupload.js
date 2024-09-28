
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('请先选择你要上传的文件');
        return;
    }

    // 检查文件类型
    const allowedTypes = ['application/zip', 'application/x-zip-compressed'];
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedTypes.includes(fileType) && fileExtension !== 'zip') {
        alert('请上传一个ZIP格式的文件');
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        alert("文件大于50MB, 请确认是不是发错文件");
        return;
    }

    const progressBar = document.getElementById("uploadProgress");
    const uploadStatus = document.getElementById("uploadStatus");
    const uploadError = document.getElementById("uploadError");

    progressBar.style.width = '0%';
    progressBar.innerText = '0%';
    progressBar.classList.remove('bg-success', 'bg-danger');
    progressBar.classList.add('bg-info');
    uploadStatus.style.display = 'none';
    uploadError.style.display = 'none';

    uploadFile(file);
}

function uploadFile(file) {
    const url = '/policyupload_url';
    const params = { key: file.name };

    axios.get(url, { params: params })
        .then(function (res) {
            const uploadUrl = res.data.url;
            // 继续处理上传逻辑...
        })
        .catch(function (error) {
            console.error('Error fetching upload URL:', error);
        });
}