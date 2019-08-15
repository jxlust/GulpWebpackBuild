### vscode
```
{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }

	// 自定义
	"function": {
		"prefix": "fn",
		"body": [
			"function $1($2) {\r\n\t$3\r\n}"
		],
		"description": "function () {}"
	},
	"console.log": {
		"prefix": "csl",
		"body": [
			"console.log($1);"
		],
		"description": "console.log()"
	},
	"alert": {
		"prefix": "al",
		"body": [
			"alert($1);"
		],
		"description": "alert()"
	},
	"class": {
		"prefix": "$cl",
		"body": [
			"$('.$1')"
		],
		"description": "class"
	},
	"id": {
		"prefix": "$id",
		"body": [
			"$('#$1')"
		],
		"description": "id"
	},
	"on": {
		"prefix": "on",
		"body": [
			"on('click',function () {\r\n\t$1\r\n})"
		],
		"description": "on"
	},
	"for": {
		"prefix": "fo",
		"body": [
			"for (let i = 0; i < $1; i++) {\r\n\t$2\r\n}"
		],
		"description": "for"
	},
	"if": {
		"prefix": "ifif",
		"body": [
			"if ($1) {\r\n\t$2\r\n}"
		],
		"description": "if"
	},
	"ifElse": {
		"prefix": "ifel",
		"body": [
			"if ($1) {\r\n\t$2\r\n} else {\r\n\t$3\r\n}"
		],
		"description": "if-else"
	},
	"ajax": {
		"prefix": "aj",
		"body": [
			// "$.ajax({\r\n\turl:$1,\r\n\tdata:{\r\n\t\t$2\r\n\t},\r\n\ttype:'post',\r\n\tdataType:'JSON',\r\n\tsuccess:function (res) {\r\n\t\t$3\r\n\t}\r\n})"
			"$.ajax({",
			"    url: '$1',",
			"    data:{",
			"        $2",
			"    },",
			"    type: 'post',",
			"    dataType: 'JSON',",
			"    success:function(res) {",
			"        $3",
			"    }",
			"});"
		],
		"description": "ajax"
	},
	"axios": {
		"prefix": "ax",
		"body": [
			"axios.$1(`$2`, {",
			"    $3",
			"}).then(res => {",
			"    console.log(res);",
			"}, rej => {",
			"    console.log(rej);",
			"}).catch(err => {",
			"    console.log(err);",
			"});",
		],
		"description": "axios"
	}
}
```