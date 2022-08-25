function ajax(type, url, data, success, failed) {
  // 创建ajax对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  type = type.toUpperCase();
  // 用于清除缓存 todo 要加时间戳哈希
  var tim = Date.now();

  if (typeof data === 'object') {
    var str = '';
    for (var key in data) {
      str += key + '=' + data[key] + '&';
    }
    data = str.replace(/&$/, '');
  }

  if (type === 'GET') {
    if (data) {
      xhr.open('GET', url + '?' + data, true);
    } else {
      xhr.open('GET', url + '?t=' + tim, true);
    }
    xhr.send();
  } else if (type === 'POST') {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }

  // 处理返回数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (success) {
          success(xhr.responseText);
        }
      } else {
        if (failed) {
          failed(xhr.status);
        }
      }
    }
  }
}