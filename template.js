function template(title)
{

  return `<div class="modal fade" id="budgetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document" style="max-width: 1000px;">
    <div class="modal-content">
      <div class="modal-header ">
      <h5 style="margin-right:20px;">Remaining Budget: <b id="remainingBudget"><script>formatCurrency(${BUDGET})</script></b></h5>
      <h5>Remaining Lines:<b id="remainingLines"> ${NUMOFLINES}</b></h5>
        <h4 class="modal-title w-100 font-weight-bold text-center">${title}</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body mx-3">
        <div class="mb-5" >
         <label data-error="wrong" data-success="right" for="budgetVal">Budget for ${title.toLowerCase()}</label>
          <input type="number" id="budgetVal" class="form-control" onfocus="returnBudget('${title}')" autofocus mdbActive placeholder="${_category[title].budget}">
          <label><span style="color:red;font-size:.6rem;display:none;" id="budgetError">Over budget</span></label>
          <label><span style="color:red;font-size:.6rem;display:none;" id="budgetErrorInvalid">Invalid buget</span></label>
                <br>
           <label data-error="wrong" data-success="right" for="linesVal">Number of Lines for ${title.toLowerCase()}</label>
          <input type="number" id="linesVal" class="form-control" onfocus="returnLines('${title}')" autofocus mdbActive placeholder="${_category[title].lines} (At Least 12)">
           <label><span style="color:red;font-size:.6rem;display:none;" id="linesError">Invalid Number Of Lines</span></label>
          <br>

               
               

                <div class="row">
                <div class="col-sm-3">
                 <button class="btn blue-gradient btn-sm" data-toggle="modal" data-target="#phrase_modal">Phrases</button>
                </div>
                <div class="col-sm-3">
                 <button class="btn purple-gradient btn-sm" data-toggle="modal" data-target="#subject_modal" onclick="getSubject()">Subjects</button>
                </div>
                <div class="col-sm-3">
                 <button class="btn peach-gradient btn-sm" data-toggle="modal" data-target="#object_modal" onclick="getObjectBox()">Objects</button>
                </div>
                <div class="col-sm-3">
                 <button class="btn aqua-gradient btn-sm" data-toggle="modal" data-target="#prefix_modal" onclick="getPrefix()">Prefixes</button>
                </div>
                </div>
                 <script>




////////////////////////////////////Phrases Handle Open///////////////////////////////////////////////
                 var tempStr=\`\`;
                 for(var i=0;i<_category['${title}'].phrases.length;i++)
                 {
                  tempStr+=\` <div class="row">
                  <div class="col-sm-5"><span class="chip">\`+
                    _category['${title}'].phrases[i]
                    + \`<i class="close fa fa-times" onclick="removePhrase('\`+_category['${title}'].phrases[i]+\`','${title}')"></i>
                  </span>
                  </div>
                  <div class="col-sm-7">
                  <select  class="browser-default custom-select" id="\`+_category['${title}'].phrases[i].replace(/ /g,'')+
                    \`Frequency">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  </div>
                  </div>
                  <br>
                  \`;
                    }
                $("#phraseBox").html(tempStr);

                $("#addPhraseBtn").click(function(){
                  var newPhrase=$("#addPhrase").val().trim();
                  if(newPhrase=='')return;
                 $("#addPhrase").val('')
                  
                  _category['${title}'].phrases.push(newPhrase)
                  _category['${title}'].objects[newPhrase]=[];
                  _category['${title}'].prefix[newPhrase]=[];
               
                  var tempStr=\` <div class="row">
                  <div class="col-sm-5"><span class="chip">\`+
                  newPhrase
                + \`<i class="close fa fa-times" onclick="removePhrase('\`+newPhrase+\`','${title}')"></i>
                  </span>
                  </div>
                  <div class="col-sm-7">
                  <select  class="browser-default custom-select" id="\`+newPhrase.replace(/ /g,'')+
                  \`Frequency">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                  </select>
                  </div>

                  </div>
                  <br>

                  \`;
                  $("#phraseBox").append(tempStr);
                })
//////////////////////////////////////////phrase Handle Close//////////////////////////////////////////




/////////////////////////////////Subject handle Open////////////////////////////////////////////////////
                function getSubject()
{
   var tempStr=\`\`;

var subject=_category['${title}'].subjects;
var subjectPhraseItems=[];
for(var items in subject)
  {
    
 
        tempStr+=\` <div class="row">
                  <div class="col-sm-4">\`+
                  items
                  +\`</div><div class="col-sm-8">\`;
                  subjectPhraseItems.push({value:items,text:items});
                  for(var i=0;i<subject[items].length;i++)tempStr+=\`<span class="chip">\`+ subject[items][i]+\`<i class="close fa fa-times" onclick="removeSubject('\`+subject[items][i]+\`','\`+items+\`','${title}')"></i></span> \`;
                      
                    
                    tempStr+=\`</div></div>\`;            
    
  }
  
    $('#subjectPhraseBox').empty();
    var sel = $('<select>').appendTo('#subjectPhraseBox');

    $(subjectPhraseItems).each(function() {
    sel.append($("<option>").attr('value',this.value).text(this.text));
    sel.attr("class","browser-default custom-select");
    sel.attr("id","subjectPhrase");
    }); 
    $("#subjectBox").html(tempStr);
}

 $("#addSubjectBtn").click(function(){
  if( _category['${title}'].phrases.length<1)return;
    var subjectPhraseItems=[];
    var subject=_category['${title}'].subjects;
    var newSubject=$("#addSubject").val().trim();
    if(newSubject=='')return;
    $("#addSubject").val('');
    var subjectPhrase=$("#subjectPhrase").val();
    subject[subjectPhrase].push(newSubject);
    var tempStr=\`\`;

    for(var items in subject)
      {
        tempStr+=\` 
        <div class="row">
          <div class="col-sm-4">\`+
            items
          +\`</div><div class="col-sm-8">\`;
        for(var i=0;i<subject[items].length;i++) 
        {
          tempStr+=\`<span class="chip">\`+ subject[items][i]+\`<i class="close fa fa-times" onclick="removeSubject('\`+subject[items][i]+\`','\`+items+\`','${title}')"></i></span> \`;
          subjectPhraseItems.push({value:items,text:items});
        }
        tempStr+=\`</div></div>\`;            
    
      }

    $("#subjectBox").html(tempStr);
  });
/////////////////////////////////////////////Subject Handle Close//////////////////////////////////////                 
                 




////////////////////////////////////////////Object Handle Open///////////////////////////////////////
function getObjectBox()
{
  var tempStr=\`\`;

var objs=_category['${title}'].objects;
var objPhraseItems=[];
for(var items in objs)
  {
    console.log(items);
 
        tempStr+=\` <div class="row">
                  <div class="col-sm-4">\`+
                  items
                  +\`</div><div class="col-sm-8">\`;
                  objPhraseItems.push({value:items,text:items});
                  for(var i=0;i<objs[items].length;i++)
    tempStr+=\`<span class="chip">\`+ objs[items][i]+\`<i class="close fa fa-times" onclick="removeObject('\`+objs[items][i]+\`','\`+items+\`','${title}')"></i></span> \`;
                      
                    
                    tempStr+=\`</div></div>\`;            
    
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


  $("#addObjectBtn").click(function(){
        if( _category['${title}'].phrases.length<1)return;
        var objPhraseItems=[];
        var objs=_category['${title}'].objects;
        var newObject=$("#addObject").val().trim();
        if(newObject=='')return;
       $("#addObject").val('');
       var objectPhrase=$("#objectPhrase").val();
       objs[objectPhrase].push(newObject);
       var tempStr=\`\`;
       for(var items in objs)
      {
    
 
        tempStr+=\`
        <div class="row">
          <div class="col-sm-4">\`+
            items
          +\`</div><div class="col-sm-8">\`;
          for(var i=0;i<objs[items].length;i++)
          {
          tempStr+=\`<span class="chip">\`+ objs[items][i]+\`<i class="close fa fa-times" onclick="removeObject('\`+objs[items][i]+\`','\`+items+\`','${title}')"></i>
          </span>\`;
            objPhraseItems.push({value:items,text:items});
      }

      tempStr+=\`</div></div>\`;            
    
  }
  $("#objectBox").html(tempStr);
  });




////////////////////////////////////////////Object Handle Close/////////////////////////////////////





///////////////////////////////////////////Prefix Handle Open//////////////////////////////////////

function getPrefix()
{
   var tempStr=\`\`;

var prefix=_category['${title}'].prefix;
var prefixPhraseItems=[];
for(var items in prefix)
  {
    
 
        tempStr+=\` <div class="row">
                  <div class="col-sm-4">\`+
                  items
                  +\`</div><div class="col-sm-8">\`;
                  prefixPhraseItems.push({value:items,text:items});
                  for(var i=0;i<prefix[items].length;i++)tempStr+=\`<span class="chip">\`+ prefix[items][i]+\`<i class="close fa fa-times" onclick="removePrefix('\`+prefix[items][i]+\`','\`+items+\`','${title}')"></i></span> \`;
                      
                    
                    tempStr+=\`</div></div>\`;            
    
  }
  
    $('#prefixPhraseBox').empty();
    var sel = $('<select>').appendTo('#prefixPhraseBox');

    $(prefixPhraseItems).each(function() {
    sel.append($("<option>").attr('value',this.value).text(this.text));
    sel.attr("class","browser-default custom-select");
    sel.attr("id","prefixPhrase");
    }); 
    $("#prefixBox").html(tempStr);
}


 $("#addPrefixBtn").click(function(){
  if( _category['${title}'].phrases.length<1)return;
    var prefixPhraseItems=[];
    var prefix=_category['${title}'].prefix;
    var newPrefix=$("#addPrefix").val().trim();
    if(newPrefix=='')return;
    $("#addPrefix").val('');
    var prefixPhrase=$("#prefixPhrase").val();
    prefix[prefixPhrase].push(newPrefix);
    var tempStr=\`\`;

    for(var items in prefix)
      {
        tempStr+=\` 
        <div class="row">
          <div class="col-sm-4">\`+
            items
          +\`</div><div class="col-sm-8">\`;
        for(var i=0;i<prefix[items].length;i++) 
        {
          tempStr+=\`<span class="chip">\`+ prefix[items][i]+\`<i class="close fa fa-times" onclick="removePrefix('\`+prefix[items][i]+\`','\`+items+\`','${title}')"></i></span> \`;
          prefixPhraseItems.push({value:items,text:items});
        }
        tempStr+=\`</div></div>\`;            
    
      }

    $("#prefixBox").html(tempStr);
  });

//////////////////////////////////////////Prefix Handle Close/////////////////////////////////////

                </script>
          
        </div>
        



        <script>
        $("#linesVal").keyup(function(){
          if(parseInt($("#linesVal").val())>NUMOFLINES||parseInt($("#linesVal").val())<1)
          {
            $("#linesError").css("display","block");
            $("#budgetValBtn").attr("disabled","disabled")
          }
          else
          {
            $("#linesError").css("display","none");
            $("#budgetValBtn").removeAttr("disabled")
          }
        });


         $("#budgetVal").keyup(function(){
  if(parseInt($("#budgetVal").val())>BUDGET)
  {
    $("#budgetError").css("display","block");
    $("#budgetValBtn").attr("disabled","disabled")
  }
  else if(parseInt($("#budgetVal").val())<1)
  {
    $("#budgetErrorInvalid").css("display","block");
    $("#budgetValBtn").attr("disabled","disabled")
  }
  else
  {
       $("#budgetError").css("display","none");
    $("#budgetValBtn").removeAttr("disabled")
     $("#budgetErrorInvalid").css("display","none");
  }
 });
        </script>

      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button id="budgetValBtn" class="btn btn-indigo" onclick="if(validateBudget()&& validateLines()){setBudget('${title}',$('#budgetVal').val());setLines('${title}',$('#linesVal').val());setFrequency('${title}');$('#budgetModal').remove();$('.modal-backdrop').remove()} else console.log('Over Budget');">Done <i class="fas fa-paper-plane-o ml-1"></i></button>
      </div>
      
    </div>
  </div>
</div>


<!-------------------------phrase modal open----------------------------------------------->
<div class="modal fade" id="phrase_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document" style="max-width: 500px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add phrases and set their priorities</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="phraseBox"></div>
         <label data-error="wrong" data-success="right" for="budgetVal">Frequency for phrases</label>
                        <div class='row'>
                <div class="col-sm-9">
                <input type="text" id="addPhrase" class="form-control " autofocus placeholder="Add phrase">
                </div>
                <div class="col-sm-3">
                <button class="btn blue-gradient btn-sm" id="addPhraseBtn">Add</button>
                </div>
                </div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn blue-gradient btn-sm" data-dismiss="modal">Done </button>  
      
      </div>
    </div>
  </div>
</div>
<!-------------------------phrase modal close----------------------------------------------->


<!-------------------------subject modal open----------------------------------------------->
<div class="modal fade" id="subject_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document" style="max-width: 400px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Subjects</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="subjectBox"></div>
        <br>
        <label data-error="wrong" data-success="right" for="budgetVal">Add new subjects</label>
                  <div class="row">
                  
                                  <div class="col-sm-5">
                <input type="text" id="addSubject" class="form-control " autofocus placeholder="Add Subject">
                </div>
                <div class="col-sm-4">
                 <div id="subjectPhraseBox"></div>
                 </div>
                <div class="col-sm-3">
                <button class="btn purple-gradient btn-sm" id="addSubjectBtn">Add</button>
                </div>
                  

                  </div>
                  <br>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn purple-gradient btn-sm" data-dismiss="modal">Done </button>  
      
      </div>
    </div>
  </div>
</div>
<!-------------------------subject modal close----------------------------------------------->




<!-------------------------object modal open----------------------------------------------->
<div class="modal fade" id="object_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document" style="max-width: 600px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Objects for a particular phrase</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="objectBox"></div>
        <br>
        <label data-error="wrong" data-success="right" for="budgetVal">Add new object to a phrase</label>
                  <div class="row">
                  
                                  <div class="col-sm-5">
                <input type="text" id="addObject" class="form-control " autofocus placeholder="Add Object to">
                </div>
                 <div class="col-sm-4">
                 <div id="objectPhraseBox"></div>
                 </div>
                <div class="col-sm-3">
                <button class="btn peach-gradient btn-sm" id="addObjectBtn">Add</button>
                </div>
                  

                  </div>
                  <br>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn peach-gradient btn-sm" data-dismiss="modal">Done </button>  
       
      </div>
    </div>
  </div>
</div>
<!-------------------------object modal close----------------------------------------------->




<!-------------------------prefix modal open----------------------------------------------->
<div class="modal fade" id="prefix_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document" style="max-width: 600px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Objects for a particular phrase</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="prefixBox"></div>
        <br>
        <label data-error="wrong" data-success="right" for="budgetVal">Add new prefix to a phrase</label>
                  <div class="row">
                  
                                  <div class="col-sm-5">
                <input type="text" id="addPrefix" class="form-control " autofocus placeholder="Add Prefix to">
                </div>
                 <div class="col-sm-4">
                 <div id="prefixPhraseBox"></div>
                 </div>
                <div class="col-sm-3">
                <button class="btn aqua-gradient btn-sm" id="addPrefixBtn">Add</button>
                </div>
                  

                  </div>
                  <br>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn aqua-gradient btn-sm" data-dismiss="modal">Done </button>  
       
      </div>
    </div>
  </div>
</div>
<!-------------------------prefix modal close----------------------------------------------->
`;
}
