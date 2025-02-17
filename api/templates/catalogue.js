const { appUrl } = require('../config')

module.exports = ({ types }) => {
	const today = new Date()

	return `
	<!doctype html>
	<html>
		 <head>
				<meta charset="utf-8">
				<title>Каталог продукції</title>
				<style>
				html, body {
					margin: 0;
					padding: 0;
					font-family: "Noto Sans", sans-serif;
					font-size: 100%;
					font-size: 16px;
					line-height: 1;
					box-sizing: border-box;
					zoom: 0.75;
				}

				.page {
					position: relative;
					display: block;
					width: 100%;
					font-size: 16px;
					line-height: 24px;
					color: #373f48;
					overflow: hidden;
				}
				
				.page table {
					width: 100%;
					text-aligh: left;
					page-break-inside: avoid;
				}
				
				.page_header table {
					background: #373f48;
					padding: 0px 20px;
				}
				
				.page_header tr td {
					vertical-align: top;
					padding: 25px 0px;
				}
				
				.page_header tr td.header_image {
					width: 78px;
					height: 32px;
				}

				.page_header tr td.header_title {
					font-size: 28px;
					font-weight: bold;
					line-height: 24px;
					text-align: left;
					color: #ffffff;
				}
				
				.page_header tr td.header_date {
					font-size: 14px;
					font-weight: normal;
					text-align: right;
					color: #ffffff;
				}

				.page_header tr td.header_date span {
					color: #ff8e01;
				}

				.page_category {
        	display: block;
				}
				
				.page_category table {
					padding: 0px 25px;
					background: #f2f0f0;
					border-bottom: 2px solid #ff8e01;
					page-break: always;
				}

				.page_category tr td {
					vertical-align: top;
					padding: 15px 0px;
				}
				
				.page_category tr td.category_title {
					font-size: 20px;
					font-weight: bold;
					line-height: 24px;
					color: #373f48;
				}

				.page_category tr td.category_link {
					font-size: 16px;
					font-weight: normal;
					line-height: 24px;
					color: #373f48;
				}

				.page_category tr td.category_link a {
					color: #373f48;
					text-decoration: underline;
				}

				.page_item tr td {
					vertical-align: top;
					padding: 10px 25px;
					border-bottom: 1px solid #999999;
				}

				.page_item tr:last-child td {
					border-bottom: none;
				}
				
				.page_item tr td:first-child {
					font-size: 16px;
					font-weight: normal;
					line-height: 24px;
				}

				.page_item tr td:last-child { 
					text-align: right;
				}

				.page_item tr td:last-child {
					font-weight: bold;
				}

				.page_item tr td.item_image img {
					width: 100px;
					height: 80px;
				}

				.page_item tr td.item_price {
					color: #ff8e01;
				}
				
				.page_item tr td.item_link a {
					color: #373f48;
					text-decoration: underline;
				}

				.page_footer table {
					padding: 0px 25px;
					background: #373f48;
				}

				.page_footer tr td {
					vertical-align: top;
					padding: 20px 0px;
				}

				.page_footer tr:first-child td {
					font-size: 14px;
					font-weight: normal;
					line-height: 24px;
					text-align: center;
					color: #ffffff;
				}

				.page_footer tr:last-child td {
					font-size: 14px;
					font-weight: normal;
					line-height: 24px;
					text-align: center;
					color: #ff8e01;
				}
				</style>
		 </head>
		 <body>
				<div class="page">
					<div class="page_header">
						<table>
							<tr>
								<td width="50%" class="header_image">
									<img src="${appUrl}/logotype.png" alt="Company logotype" />
								</td>
							</tr>
							<tr>
								<td width="50%" class="header_title">
									Каталог продукції
								</td>
								<td width="50%" class="header_date">
									Актуальна дата каталогу:
									<span>
										${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
									</span>
								</td>
							</tr>
						</table>
					</div>
					<div class="page_items">
						${types && types.length > 0 && types.map(({ url, title, tiles }) => (
		`<div class="page_category">
								<table>
									<tr>
										<td width="50%" class="category_title">
											${title}
										</td>
									</tr>
									<tr>
										<td width="50%" class="category_link">
											Посилання
											<a href="${appUrl}/catalogue/${url}" target="_blank">
												${appUrl}/catalogue/${url}
											</a>
										</td>
									</tr>
								</table>
							</div>
							<div class="page_item">
								<table>
								${tiles && tiles.length > 0 && tiles.map(({ url: tileUrl, title: tileTitle, images, prices }) => (
			`<tr class='page-break'>
										<td width="50%">
											Назва продукту
										</td>
										<td width="50%" class="item_title">
											${tileTitle}
										</td>
									</tr>
									<tr>
										<td width="50%">
											Зображення продукту
										</td>
										<td width="50%" class="item_image">
											<img class='image' src=${images[0]} alt='image' />
										</td>
									</tr>
									<tr>
										<td width="50%">
											Посилання
										</td>
										<td width="50%" class="item_link">
											<a href="${appUrl}/catalogue/${url}/${tileUrl}" target="_blank">
												${appUrl}/catalogue/${url}/${tileUrl}
											</a>
										</td>
									</tr>
									<tr>
										<td width="50%">
											Базова ціна продукту
										</td>
										<td width="50%" class="item_price">
											${Object.values(prices)[0]} грн.
										</td>
									</tr>`
		)).join('')}
								</table>
							</div>`
	)).join('')}
						</div>
						<div class="page_footer">
							<table>
								<tr>
									<td width="33.33%">
										Адреса
									</td>
									<td width="33.33%">
										Телефон
									</td>
									<td width="33.33%">
										Час роботи
									</td>
								</tr>
								<tr>
									<td width="33.33%">
										Великий Березний вул. Верховинська, 10
									</td width="33.33%">
									<td>
										+380636666666
									</td>
									<td width="33.33%">
										Пн-Сб / 9:00 - 20:00
									</td>
								</tr>
							</table>
						</div>
				</div>
		 </body>
	</html>`
}
