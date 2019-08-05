const ipc = require('electron').ipcRenderer
SHEET=[];
 ipc.on('getSheet',function(event,arg){
 
 	ipc.send('sheetGotten', [SHEET,arg]);
 });

ipc.on('displaySaved',function(event,arg){
	$(".alert").fadeIn(0).fadeOut(1500);
});

count=0;

months=['January','Feburary','March','April','May','June','July','August','September','October','November','December'];
DATES={
		"January":{"name":"January","value":0,"days":[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]},
		"Feburary":{"name":"Feburary","value":1,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]},
		"March":{"name":"March","value":2,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]},
		"April":{"name":"April","value":3,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
		"May":{"name":"May","value":4,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]},
		"June":{"name":"June","value":5,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
		"July":{"name":"July","value":6,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]},
		"August":{"name":"August","value":7,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]},
		"September":{"name":"September","value":8,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
		"October":{"name":"October","value":9,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]},
		"November":{"name":"November","value":10,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
		"December":{"name":"December","value":11,"days":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
	};

function Generate()
{
	SHEET=[];
	
	for(var name in _category)
	{
		if(_category.hasOwnProperty(name))
		{
			if(_category[name].show)
			{
				var category=_category[name];
				var budgetByMonths=splitBudgetIntoMonths(category.budget)
				var numOfLinesByMonths=getNumberOfLinesByMonth(category.lines)
				for(var i=0;i<numOfLinesByMonths.length;i++)numOfLinesByMonths[i]=Math.round(numOfLinesByMonths[i]);
				for(var i=0;i<budgetByMonths.length;i++)splitMonthlyBudget(budgetByMonths[i],numOfLinesByMonths[i],category.priority,months[i],category);
				
			}
			
		}
	}
	TOTALPRICE=0;
	for(var i=0;i<SHEET.length;i++)SHEET[i].price=adjustPriceAndCalculate(Math.round(SHEET[i].price));

	spreadTotalPrice(getArrObjTotal(SHEET,'price'));

	formatPrice();createDates();orderByDate();formatDate();addTotalToSheet();displaySheet();
	
	

}

function addTotalToSheet()
{
	SHEET.push({description:'TOTAL',price:BUDGET_COPY,date:''});
}
function formatPrice()
{
	for(var i=0;i<SHEET.length;i++)SHEET[i].price=formatCurrency(SHEET[i].price);
}

function formatDate()
{
	for(var i=0;i<SHEET.length;i++)
	{
		var date=SHEET[i].date.split('/');
		
		SHEET[i].date=date[0]+' '+months[parseInt(date[1])]+', '+date[2];
	}
}


function createDates()
{
	var randomValue;
	var tempDate;
	var currentDate=new Date();
	var currentYear=currentDate.getFullYear();
	for(var i=0;i<SHEET.length;i++)
	{
		tempDate=DATES[SHEET[i].date];
		randomValue=getRandomValue(tempDate.days);
		while(isWeekend(randomValue,tempDate.value,currentYear))
		{
			randomValue=getRandomValue(tempDate.days);
		}
		SHEET[i].date=`${randomValue}/${tempDate.value}/${currentYear}`;

	}
}

function isWeekend(day,month,year)
{
	var tempDate=new Date();
	tempDate.setFullYear(year);
	tempDate.setMonth(month);
	tempDate.setDate(day);
	return (tempDate.getDay()==6 || tempDate.getDay()==0)
}


function orderByDate()
{
	var tempSheet,j;
	for(var i=1;i<SHEET.length;i++)
	{
		var j=i;
		while(j>0&&getTimeStamp(SHEET[j-1].date)>getTimeStamp(SHEET[j].date))
		{
			
				tempSheet=SHEET[j];
				SHEET[j]=SHEET[j-1];
				SHEET[j-1]=tempSheet;
				j--;			
		}
	}
}

function getTimeStamp(date)
{
	var date=date.split('/');
	var d=new Date();
	d.setFullYear(date[2]);
	d.setMonth(date[1]);
	d.setDate(date[0]);
	return d.getTime();
}


function displaySheet()
{
	var table=`<table class="table" style="color:black;font-weight:400;"><tr ><th>Description</th><th>Date</th><th>Cost</th></tr>`;

	for(var i=0;i<SHEET.length-1;i++)table+=`<tr><td><input type="text" class="form-control" value="${SHEET[i].description}" ></td><td>${SHEET[i].date}</td><td>₦${SHEET[i].price}</td></tr>`;
	table+=`<tr><td></td><td></td><td style="border:1px solid black;font-weight:900;">₦${BUDGET_COPY}.00</td></tr>`
	table+=`</table>`;
	
	$("#sheet").html(table);
}

function spreadTotalPrice(sheetTotal)
{
	var remaining=BUDGET_COPY-sheetTotal;
	var randomIndex,increment;
	increment=getIncrement(remaining);
	while(remaining>=increment)
	{
		 randomIndex=getRandomIndex(SHEET.length);
		SHEET[randomIndex].price=parseInt(SHEET[randomIndex].price)+increment;
		//log(`${SHEET[randomIndex].price-increment} + ${increment}`,SHEET[randomIndex].price);
		remaining-=increment;
	}
	if(remaining>0)
	{
		randomIndex=getRandomIndex(SHEET.length);
		SHEET[randomIndex].price=parseInt(SHEET[randomIndex].price)+remaining;
	}
		

function getIncrement(remaining)
{
	var increment;
	if(remaining<10000)increment=10;
	else if(remaining<100000)increment=100;
	else if(remaining<1000000)increment=1000;
	else if(remaining<10000000)increment=10000;
	else increment=100000;
	return increment;

}
	

}



function adjustPriceAndCalculate(price)
{
	
	price=price.toString();
	if(parseInt(price[price.length-1])>=5)
	{
		price=price.toString().replace(/.$/,"0");

		price=parseInt(price)+10;
		TOTALPRICE+=price;
		return price;
	}
	else
	{
		price=price.toString().replace(/.$/,"0");
		price=parseInt(price)-10;
		TOTALPRICE+=price;
		return price;
	}
}



function splitMonthlyBudget(budget,numOfLinesPerMonth,priority,monthName,category)
{
	//console.log(numOfLinesPerMonth+" lines for "+monthName);
	priorityTable={'Low':1,'Medium':2,'High':3};
	log("numOfLinesPerMonth",numOfLinesPerMonth);

	var count=0;
	var phrasePriorityTemp={};
	var totalPriorityScore=getTotalPriorityScore(priority);
	

	
		for(var phrase in priority)
		{
			
			
			if(priority.hasOwnProperty(phrase))
			{
				if(count==numOfLinesPerMonth)continue;
				var priorityScore=priorityTable[priority[phrase]];

				phrasePriorityTemp[phrase]={count:Math.round((priorityScore*numOfLinesPerMonth)/totalPriorityScore),name:phrase};
				count++;

			}
		}


	generateDescription(phrasePriorityTemp,totalPriorityScore,budget,monthName,category,numOfLinesPerMonth);
	





}

function getTotalPriorityScore(priority)
{
	var total=0;
	for(var phrase in priority)
	{
		if(priority.hasOwnProperty(phrase))	total+=priorityTable[priority[phrase]];
						
	}
	return total;
}

function generateDescription(phrasePriority,totalScore,budget,monthName,category,numOfLinesPerMonth)
{
	var tempEqual=budget/numOfLinesPerMonth;
	var tempArr=[];
	
	for(var phrase in phrasePriority)
	{
		
		if(phrasePriority.hasOwnProperty(phrase))
		{
			
			for(var i =0;i<phrasePriority[phrase].count;i++)
					SHEET.push({description:generateDescriptionSentence(phrasePriority[phrase].name,category),price:tempEqual,date:monthName});
	
		
		}
	}
}



function generateDescriptionSentence(phraseName,category)
{
	var description=`${phraseName} `;
	if(!emptyObject(category.subjects)&&objectHas(category.subjects,phraseName)&&!emptyArray(category.subjects[phraseName]))
		{
			if(getRandomValue([true,false]))description+=`${getRandomValue(category.subjects[phraseName])} `;
		}
	if(!emptyObject(category.objects)&&objectHas(category.objects,phraseName)&&!emptyArray(category.objects[phraseName])) description+=`${getRandomValue(category.objects[phraseName])} `;
	if(!emptyObject(category.prefix)&&objectHas(category.prefix,phraseName)&&!emptyArray(category.prefix[phraseName]))
	{
		if(getRandomValue([true,false]))description+=`${getRandomValue(category.prefix[phraseName])} `;
	} 
	return description;
}


function emptyArray(arr)
{
	return !arr.length;
}


function objectHas(obj,attr)
{
	return obj.hasOwnProperty(attr);
}


function emptyObject(obj)
{
	return jQuery.isEmptyObject(obj);
}


function log(str,val)
{
	console.log(str+" : "+val);
}


function withInBudget(amount,budget)
{
	return amount<=budget;
}


function splitBudgetIntoMonths(budget)
{
	var budgetByMonths=[];
	var percentagesBymonth=getPercentagesByMonth();
	var tempArr=[];

	for(var i=0;i<months.length;i++)tempArr.push(resolvePercentage(budget,percentagesBymonth[i]));
	
	return tempArr;

}


function resolvePercentage(budget,percent)
{
	return (budget*percent)/100;
}


function getTotal(arr)
{
	var total=0;
	for(var i=0;i<arr.length;i++)total+=arr[i];
		return total;
}


function getArrObjTotal(arrObj,prop)
{
	var total=0;
	for(var i=0;i<arrObj.length;i++)total+=arrObj[i][prop];
		return total;

}


function getPercentagesByMonth()
{
	var tempMultiplier=[1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5];
	var tempPercentagArray=[];
	var total=16.6666666667;
	for(var i=0;i<6;i++)
	{
		var firstVal=total/getRandomValue(tempMultiplier);
		tempPercentagArray.push(firstVal);
		tempPercentagArray.push(total-firstVal);
	}
	return tempPercentagArray;
}


function getNumberOfLinesByMonth(linesPerYear)
{
	var tempArr=[];
	var linesPerMonth=Math.round(linesPerYear/months.length);
	for(var i=0;i<months.length;i++)tempArr.push(linesPerMonth);
	if(getTotal(tempArr)<linesPerYear)
	{
		var remaining=linesPerYear-getTotal(tempArr);
		tempArr[getRandomIndex(tempArr.length)]+=remaining;
	}
	return tempArr;

}


function getRandomIndex(length)
{
	return Math.floor((Math.random()*(length)));
}


function getRandomValue(arr)
{
	return arr[Math.floor((Math.random()*(arr.length)))];
}


function shuffle(array)
{

  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex -= 1;

    temporaryValue = array[currentIndex];

    array[currentIndex] = array[randomIndex];

    array[randomIndex] = temporaryValue;
  }

  return array;
}


function removePhrase(phrase,title)
{

	var tempStr=``;
	for(var i=0;i<_category[title].phrases.length;i++)
	{
		if(_category[title].phrases[i]==phrase)
		{
			_category[title].phrases.splice(i,1);
			delete _category[title].objects[phrase];
			delete _category[title].prefix[phrase];
		}	
	
	}

	for(var i=0;i<_category[title].phrases.length;i++)
	{
		
		tempStr+=` <div class="row">
			<div class="col-sm-5"><span class="chip">`+
				_category[title].phrases[i]
				+ `<i class="close fa fa-times" onclick="removePhrase('`+_category[title].phrases[i]+`','${title}')"></i>
			</span>
		</div>
		<div class="col-sm-7">
			<select  class="browser-default custom-select" id="`+_category[title].phrases[i].replace(/ /g,'')+
				`Frequency">
				<option>High</option>
				<option>Medium</option>
				<option>Low</option>
			</select>
		</div>
		</div>
		<br>
		`;
	}
	$("#phraseBox").html(tempStr);
}



function removeSubject(subjectWord,phrase,title)
{
	var tempStr=``;
	var subject=_category[title].subjects;
	for(var i=0;i<subject[phrase].length;i++)
	{
		if(subject[phrase][i]==subjectWord)subject[phrase].splice(i,1);
	}
var subjectPhraseItems=[];
for(var items in subject)
{

        tempStr+=` <div class="row">
                  <div class="col-sm-4">`+
                  items
                  +`</div><div class="col-sm-8">`;
                  subjectPhraseItems.push({value:items,text:items});
                  for(var i=0;i<subject[items].length;i++)
                  tempStr+=`<span class="chip">`+ subject[items][i]+`<i class="close fa fa-times" onclick="removeSubject('`+subject[items][i]+`','`+items+`','${title}')"></i></span> `;
				 tempStr+=`</div></div>`;            
    
  }
}



function removeObject(object,phrase,title)
{
	var tempStr=``;
	var objs=_category[title].objects;
	for(var i=0;i<objs[phrase].length;i++)
	{
		if(objs[phrase][i]==object)objs[phrase].splice(i,1);
	}
var objPhraseItems=[];
for(var items in objs)
{

        tempStr+=` <div class="row">
                  <div class="col-sm-4">`+
                  items
                  +`</div><div class="col-sm-8">`;
                  objPhraseItems.push({value:items,text:items});
                  for(var i=0;i<objs[items].length;i++)
                  tempStr+=`<span class="chip">`+ objs[items][i]+`<i class="close fa fa-times" onclick="removeObject('`+objs[items][i]+`','`+items+`','${title}')"></i></span> `;
				 tempStr+=`</div></div>`;            
    
  }

  $('#objectPhraseBox').empty();
  var sel = $('<select>').appendTo('#objectPhraseBox');
$(objPhraseItems).each(function() {
 sel.append($("<option>").attr('value',this.value).text(this.text));
 sel.attr("class","browser-default custom-select");
 sel.attr("id","objectPhrase");
});
 $("#objectBox").html(tempStr);
}



function removePrefix(prefixWord,phrase,title)
{
	var tempStr=``;
	var prefix=_category[title].prefix;
	for(var i=0;i<prefix[phrase].length;i++)
	{
		if(prefix[phrase][i]==prefixWord)prefix[phrase].splice(i,1);
	}
var prefixPhraseItems=[];
for(var items in prefix)
{

        tempStr+=` <div class="row">
                  <div class="col-sm-4">`+
                  items
                  +`</div><div class="col-sm-8">`;
                  prefixPhraseItems.push({value:items,text:items});
                  for(var i=0;i<prefix[items].length;i++)
                  tempStr+=`<span class="chip">`+ prefix[items][i]+`<i class="close fa fa-times" onclick="removeObject('`+prefix[items][i]+`','`+items+`','${title}')"></i></span> `;
				 tempStr+=`</div></div>`;            
    
  }
}



function returnBudget(category)
{
	BUDGET+=_category[category].budget;
	_category[category].budget=0;
	$("#remainingBudget").text(BUDGET);
}

function returnLines(category)
{
	NUMOFLINES+=_category[category].lines;
	_category[category].lines=0;
	$("#remainingLines").text(NUMOFLINES);
}


function formatCurrency(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}