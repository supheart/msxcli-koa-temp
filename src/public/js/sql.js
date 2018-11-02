window.dataList = [];
const dataItemOrigin = (id) => ({ id, key: '', value: '' });

window.onload = function () {
	getList();
};

// 查询获取整个列表
function getList() {
	axios.post('/sql/list').then(res => {
		if (res.data.code === 0) {
			dataList = res.data.data;
			initRow();
		}
	});
}

// 根据请求数据初始化到页面
function initRow() {
	if (!dataList.length) return;
	const fragment = document.createDocumentFragment();
	dataList.forEach(item => {
		const tr = createRow(item);
		fragment.append(tr);
	});
	const tbody = document.querySelector('#tbody');
	tbody.innerHTML = '';
	tbody.appendChild(fragment);
}

// 通过界面的点击操作实现添加操作
function addRow() {
	const tbody = document.querySelector('#tbody');
	if (dataList.length === 0) {
		tbody.innerHTML = '';
		const tr = createEditRow(1);
		tbody.appendChild(tr);
		dataList.push(dataItemOrigin(1));
		return;
	}
	const rowIndex = Math.random().toString(36).substr(2);
	const editTr = createEditRow(rowIndex);
	tbody.appendChild(editTr);
	dataList.push(dataItemOrigin(rowIndex));
}

// 点击编辑按钮操作
function editRow(index) {
	const tbody = document.querySelector('#tbody');
	const curTr = document.querySelector(`#rowTr${index}`);
	const nextChild = curTr.nextSibling;
	const editData = dataList.find(item => item.id === index);
	const editTr = createEditRow(index, editData);
	tbody.removeChild(curTr);
	tbody.insertBefore(editTr, nextChild);
}

// 添加或编辑的接口操作，type false为编辑，true为新增
function edit(index, type) {
	const key = document.querySelector(`#rowKey${index}`).value;
	const value = document.querySelector(`#rowValue${index}`).value;
	if (!key || !value) {
		alert('请填写完整数据');
		return;
	}
	if(type) {
		axios.post('/sql/add', { key, value }).then(res => {
			if (res.data.code === 0) {
				editOp(index, { id: res.data.data, key, value });
			}
		});
	} else {
		axios.post('/sql/update', { id: index, key, value }).then(res => {
			if(res.data.code === 0) {
				editOp(index, res.data.data);
			}
		});
	}
}

// 添加或编辑或的接口处理方法
function editOp(index, row) {
	const { id, key, value } = row;
	const tbody = document.querySelector('#tbody');
	const curTr = document.querySelector(`#rowTr${index}`);
	const nextChild = curTr.nextSibling;
	const addData = { id, key, value };
	const tr = createRow(addData);
	tbody.removeChild(curTr);
	tbody.insertBefore(tr, nextChild);
	const fIndex = dataList.findIndex(item => item.id === index);
	dataList.splice(fIndex, 1, addData);
}

// 删除按钮操作
function del(index, key) {
	if (confirm('你确定删除这行数据吗？')) {
		axios.delete('/sql', { params: { id: index } }).then(res => {
			if (res.data.code === 0) {
				console.log(res.data);
				const tbody = document.querySelector('#tbody');
				const delTr = document.querySelector(`#rowTr${index}`);
				tbody.removeChild(delTr);
			} else {
				res.data.message && alert(res.data.message);
			}
		});
	}
}

// 取消操作按钮
function cancel(index) {
	const tbody = document.querySelector('#tbody');
	const curData = dataList.find(item => item.id === index);
	if (dataList.length === 0 || (dataList.length === 1 && !curData.key && !curData.value)) {
		// 原本没有数据或者只有一行数据但是数据内容未空
		tbody.innerHTML = '';
		const tr = createEmptyRow();
		tbody.appendChild(tr);
		dataList = [];
	} else if (!curData.key && !curData.value) {
		const curTr = document.querySelector(`#rowTr${index}`);
		tbody.removeChild(curTr);
		const fIndex = dataList.findIndex(item => item.id === index);
		dataList.splice(fIndex, 1);
		// 当前行的数据为空
	} else {
		// 当前行有数据
		const curTr = document.querySelector(`#rowTr${index}`);
		const nextChild = curTr.nextSibling;
		const tr = createRow(curData);
		tbody.removeChild(curTr);
		tbody.insertBefore(tr, nextChild);
	}
}

// 创建无数据空行内容
function createEmptyRow() {
	// 添加空数据的表格行
	const tr = document.createElement('tr');
	const td = document.createElement('td');
	td.colSpan = 4;
	td.className = 'empty';
	const text = document.createTextNode('暂无内容');
	td.appendChild(text);
	tr.appendChild(td);
	return tr;
}

// 创建展示行内容
function createRow(row) {
	// 添加表格行
	const tr = document.createElement('tr');
	tr.id = `rowTr${row.id}`;
	// 添加表格文本单元格
	const td1 = document.createElement('td');
	const td2 = document.createElement('td');
	const td3 = document.createElement('td');
	td1.innerText = row.id;
	td2.innerText = row.key;
	td3.innerText = row.value;
	// 添加操作按钮
	const tdOp = document.createElement('td');
	const editBtn = document.createElement('button');
	const delBtn = document.createElement('button');
	editBtn.innerText = '编辑';
	delBtn.innerText = '删除';
	editBtn.onclick = () => editRow(row.id, row.key);
	delBtn.onclick = () => del(row.id, row.key);
	tdOp.append(editBtn, delBtn);

	tr.append(td1, td2, td3, tdOp);
	return tr;
}

// 创建可编辑行内容
function createEditRow(rowIndex, row = {}) {
	// 添加表格行
	const tr = document.createElement('tr');
	tr.id = `rowTr${rowIndex}`;
	// 添加表格输入框单元格
	const tdIndex = document.createElement('td');
	const tdKey = document.createElement('td');
	const tdValue = document.createElement('td');
	const inputKey = document.createElement('input');
	const inputValue = document.createElement('input');
	inputKey.type = 'text';
	inputValue.type = 'text';
	inputKey.value = row.key || '';
	inputValue.value = row.value || '';
	inputKey.id = `rowKey${rowIndex}`;
	inputValue.id = `rowValue${rowIndex}`;
	tdIndex.innerText = rowIndex;
	tdKey.appendChild(inputKey);
	tdValue.appendChild(inputValue);
	// 添加操作按钮
	const tdOp = document.createElement('td');
	const submitBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');
	submitBtn.innerText = '确定';
	cancelBtn.innerText = '取消';
	submitBtn.onclick = () => edit(rowIndex, !row.id);
	cancelBtn.onclick = () => cancel(rowIndex);
	tdOp.append(submitBtn, cancelBtn);

	tr.append(tdIndex, tdKey, tdValue, tdOp);
	return tr;
}
