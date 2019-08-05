logicScreen=`<script>
$(document).ready(function() {
  $('.mdb-select').materialSelect();
  $('.chips-initial').materialChip({
  data: [{
  tag: 'Fueling/Motor Vehicle'
  }, {
  tag: 'Stationary'
  },
  {
  tag: 'Transportation'
  },
  {
  tag: 'Housing/Accomodation'
  },
  {
  tag: 'Office Expenses'
  },
  {
  tag: 'Telephone/Postage'
  },
  {
  tag: 'Repair/Maintenance'
  },
  {
  tag: 'Electricity/Power'
  }],
  placeholder: 'Add Category'
  });
  $('.chips').on('chip.add', function(e, chip){
  _category[chip.tag]={name:chip.tag,show:false,id:category_id++,budget:0,phrases:[],objects:{},subjects:{},prefix:{}};
  $('.chip').off('click');
  $('.chip').click(function(e){
  chipClick(e);
  });
  handleChipEvent(chip)
  });
  $('.chips').on('chip.delete', function(e, chip){
  _category[chip.tag].show=false;
  removeCategory(chip.tag)
  });
  $('.chip').click(function(e)
  {
  setTimeout(function(){
  chipClick(e);
  },500);
  
  
  });
  })
</script>
    <div class="row">
  <div class="col-sm-1 " style="background-color: #4e89ea;position: fixed;left: 0px;height: 100%;width:50px;padding:6px;" >
  <div class="row">
<div class="col-sm-12" style="margin:0px;padding:0px;">
 <span style="color:white;cursor:pointer;" onclick=" $('#content').html(homeScreen);">Back</span>
</div>
  </div>
  </div>
  <div class="col-sm-11 " style="padding-left: 0px;position:absolute;right:0;">
    <div class="row" style="margin-top: 20px;">
      <div class="col-sm-12">
        <img src="images/logo-lg.jpg" class="img-fluid">
      </div>
    </div>
    <div class="row" style="margin-top: 30px;">
      <div class="col-sm-12">
        <div class="chips chips-initial"></div>
        <button class="btn btn-primary" onclick="Generate();">Generate</button>
      </div>
    </div>
    <div class="row" style="margin-top: 100px;margin-bottom: 100px;">
      <div class="col-sm-12">
        <div id="sheet">
        </div>
        <div>
        </div>
      </div>
      <div id="modal">
      </div>
    </div>
    `;
   
    
   
    _autoGenerate=true;
    targetElem=null;
    category_id=0;
    let _category= {
    'Fueling/Motor Vehicle':{
    show:false,
    name:'Fueling/Motor Vehicle',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Fueling of':["buchi's"]},
    phrases:['Fueling of','Fueling for'],
    objects:{'Fueling of':['car'],'Fueling for':['people on trips','Machinery']},
    prefix:{'Fueling of':['in Abia','in Adamawa','in Akwa Ibom','in Anambra','in Bauchi','in Bayelsa','in Benue','in Borno','in Cross River','in Delta','in Ebonyi','in Enugu','in Edo','in Ekiti','in Gombe','in Imo','in Jigawa','in Kaduna','in Kano','in Kastina','in Kebbi','in Kogi','in Kwara','in Lagos','in Nasarawa','in Niger','in Ogun','in Ondo','in Osun','in Oyo','in Plateau','in Rivers','in Sokoto','in Taraba','in Yobe','in Zamfara'],'Fueling for':[]}
    },
    'Stationary':{
    show:false,
    name:'Stationary',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Purchase of':[]},
    prefix:{'Purchase of':[]},
    phrases:['Purchase of'],
    objects:{'Purchase of':['Notebooks','Markers','Erasers','Pencils','Pens','Printer','Highlighters','Notepads','File clippers','Office Folders',]}
    
    },
    'Electricity/Power':{
    show:false,
    name:'Electricity/Power',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Electricity bill for':[]},
    phrases:['Electricity bill for'],
    objects:{'Electricity bill for':['office','site accomodation']},
    prefix:{'Electricity bill for':['in Abia','in Adamawa','in Akwa Ibom','in Anambra','in Bauchi','in Bayelsa','in Benue','in Borno','in Cross River','in Delta','in Ebonyi','in Enugu','in Edo','in Ekiti','in Gombe','in Imo','in Jigawa','in Kaduna','in Kano','in Kastina','in Kebbi','in Kogi','in Kwara','in Lagos','in Nasarawa','in Niger','in Ogun','in Ondo','in Osun','in Oyo','in Plateau','in Rivers','in Sokoto','in Taraba','in Yobe','in Zamfara']}
    }
    ,
    'Transportation':{
    show:false,
    name:'Transportation',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Transport to':[]},
    prefix:{'Transport to':[]},
    phrases:['Transport to'],
    objects:{'Transport to':['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Enugu','Edo','Ekiti','Gombe','Imo','Jigawa','Kaduna','Kano','Kastina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara']}
    },
    'Housing/Accomodation':{
    show:false,
    name:'Housing/Accomodation',
    id:category_id++,
    budget:0,
    lines:0,
    prefix:{'Cost for accomodation for ':[]},
    phrases:['Cost for accomodation for '],
    objects:{'Cost for accomodation for ':['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Enugu','Edo','Ekiti','Gombe','Imo','Jigawa','Kaduna','Kano','Kastina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',]},
    subjects:{'Cost for accomodation for ':[]}
    },
    'Office Expenses':{
    show:false,
    name:'Office Expenses',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Purchase of':[]},
    prefix:{'Purchase of':[]},
    phrases:['Purchase of'],
    objects:{'Purchase of':['Water dispenser refill','toiletries','air freshners','desks']}
    },
    'Telephone/Postage':{
    show:false,
    name:'Telephone/Postage',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Recharge card for':[],'waybill cost to':[]},
    prefix:{'Recharge card for':[],'waybill cost to':[]},
    phrases:['Recharge card for','waybill cost to'],
    objects:{'Recharge card for':['MD office line','staff members','site managers'],'waybill cost to':['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Enugu','Edo','Ekiti','Gombe','Imo','Jigawa','Kaduna','Kano','Kastina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',]}
    },
    'Repair/Maintenance':{
    show:false,
    name:'Repair/Maintenance',
    id:category_id++,
    budget:0,
    lines:0,
    subjects:{'Repair of':[],'Replacement of':[],'Bodywork for':[]},
    prefix:{'Repair of':[],'Replacement of':[],'Bodywork for':[]},
    phrases:['Repair of','Replacement of','Bodywork for'],
    objects:{'Repair of':['Car parts','office furniture','vehicle and machinery'],'Replacement of':['Car parts','office furniture','vehicle and machinery'],'Bodywork for':['Car parts','office furniture','vehicle and machinery']}
    }
    }
    function handleChipEvent(chip)
    {
    console.log(chip.id)
    }
    async function chipClick (e)
    {
    var id=e.currentTarget.childNodes[0].data;
    
    if (typeof(_category[id]) == 'undefined')
    {
    console.log(`${id} does not exist`)
    return false;
    }
    
    targetElem=e.target;
    $(".chip").css({'background-color':"#eceff1",'color':"rgba(0,0,0,.6)"});
    
    $(".set").css({"background-color":'#00c851',"color":'white'});
    $(targetElem).css({"background-color":"#4e89ea","color":"white"})
    $("#modal").html(template(id));
    $("#budgetModal").modal('show');
    }
    function removeCategory(chipTag)
    {
    BUDGET+=_category[chipTag].budget;
    NUMOFLINES+=_category[chipTag].lines;
    delete _category[chipTag]
    }
    function setBudget(categoryName,budget)
    {
    BUDGET+=_category[categoryName].budget;
    _category[categoryName].budget=parseInt(budget);
    _category[categoryName].show=true;
    BUDGET-=budget;
    
    }
    function setLines(categoryName,lines)
    {
      NUMOFLINES+=_category[categoryName].lines;
    _category[categoryName].lines=parseInt(lines);
    NUMOFLINES-=lines;
    }
    function setFrequency(categoryName)
    {
    var tempObj={}
    
    for(var i=0;i<_category[categoryName].phrases.length;i++)
    {
    var id=_category[categoryName].phrases[i].replace(/ /g,'')+"Frequency";
    tempObj[_category[categoryName].phrases[i]]=document.getElementById(id).value;
    }
    _category[categoryName].priority=tempObj;
    }
    function validateBudget()
    {
    var currentBudget=parseInt($("#budgetVal").val());
    if((BUDGET-currentBudget)>=0)
    {
    $(targetElem).css("background-color","#00c851")
    $(targetElem).addClass('set')
    return true;
    }
    
    else  return false;
    }

    function validateLines()
    {
    var currentLines=parseInt($("#linesVal").val());
    if((NUMOFLINES-currentLines)>=0)
    {
   
    return true;
    }
    
    else  return false;
    }
    function setAttributes(el, attrs) {
    for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
    }
    }
    function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
    }