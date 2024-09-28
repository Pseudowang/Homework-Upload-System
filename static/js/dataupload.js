const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('请先选择你要上传的文件');
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
    const url = '/dataupload_url';
    const params = { key: file.name };

    axios.get(url, { params: params })
        .then(function (res) {
            const uploadUrl = res.data.url;
            const config = {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        const percentComplete = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        const progressBar = document.getElementById('uploadProgress');
                        progressBar.style.width = percentComplete + '%';
                        progressBar.innerText = percentComplete + '%';
                        console.log("Upload progress: " + percentComplete + "%");
                    }
                }
            };

            axios.put(uploadUrl, file, config)
                .then(function () {
                    const progressBar = document.getElementById('uploadProgress');
                    progressBar.classList.remove('bg-info', 'bg-danger');
                    progressBar.classList.add('bg-success');
                    document.getElementById('uploadStatus').style.display = 'block';
                    document.getElementById('uploadError').style.display = 'none'; // Hide error on success
                })
                .catch(function () {
                    const progressBar = document.getElementById('uploadProgress');
                    progressBar.classList.remove('bg-info', 'bg-success');
                    progressBar.classList.add('bg-danger');
                    document.getElementById('uploadStatus').style.display = 'none'; // Hide success on error
                    document.getElementById('uploadError').style.display = 'block';
                });
        })
        .catch(function () {
            alert('获取上传URL失败.');
        });
}