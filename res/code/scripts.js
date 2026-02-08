$(document).ready(function(){
 /*
    $("#resumButton").click(function(){
        console.log("clicked");
        $("#resume").css("transform","translate(-20px, 20px)")
        setTimeout(function(){
            $("#resume").css("transform","translate(0, 0)")
        },5000)
    })
*/

    let projectSkillMap = new Map()


    $(".project").each(function(){

        let skillArray = $(this).attr("data-skillList").split(',')
        let resultArray = [];

        skillArray.forEach(function(skill) {
            let $el = $('[data-relatedSkills="' + skill + '"]');
            if ($el.length) {
                resultArray.push($el[0]);
            }

        });
        projectSkillMap.set($(this).attr("id"), resultArray.reverse());
        $(this).find("button").click(function(){
            arrangeSkills(resultArray)
        })
    })

    $(".project").hover(function(){
        $(".skill").each(function(){
         $(this).css("opacity","0.7");
        })
    let skillElementArray =  projectSkillMap.get($(this).attr("id"))
    let $elements = $(skillElementArray);
    $elements.each(function(){
        let hoverclass = this.getAttribute("data-hoverstyle")+"-hover";
        $(this).addClass(hoverclass);
        $(this).css("opacity","1.0");
       // $(this).css("transform","translate(0px, -3px)");
    })

    }, function(){
        let skillElementArray =  projectSkillMap.get($(this).attr("id"))
        $(skillElementArray).each(function(){
            let hoverclass = this.getAttribute("data-hoverstyle")+"-hover";
            $(this).removeClass(hoverclass);
        })
        $(".skill").each(function(){
            $(this).css("opacity", "1");
           // $(this).css("transform","translateY(0)");
        })
    });
});

let arrangeSkills = function(elArray){
    //save previous order
    let preSkillOrder = document.querySelectorAll("#otherSkills>.skill")
    $(".skill").each(function(){
        $(this).data("oldPosX",$(this).position().left)
        $(this).data("oldPosY",$(this).position().top)
    })
    //reposition all elements
    elArray.forEach(function(element){
        $("#otherSkills").prepend(element);
    })
    //save new Position, calculate transformation. (old->current, so old-new
    $(".skill").each(function(){
        $(this).data("newPosY",$(this).position().top)
        $(this).data("newPosX",$(this).position().left)
    })
    $(preSkillOrder).each(function(){
        //calculate and set new transform
        let el = $(this).get(0)
        var posChangeX= ($(this).data("oldPosX")-($(this).position().left));
        var posChangeY = (($(this).data("oldPosY")-$(this).position().top))

        $(".skill").append($(this))

        // CHANGE TRANSITION LENGTH FOR TRANSFORMS
        var transitions  =getComputedStyle($(this).get(0)).getPropertyValue("transition")
        var transitionsX =transitions.replace(", transform 3s", "")
        el.style.transition = transitionsX
        el.style.transform="translate("+posChangeX+"px,"+posChangeY+"px)";

        //REVERT TRANSFORMS
        setTimeout(function(){
            el.style.transition = transitions
            el.style.transform="translate(0,0)";
        },100)
    })
}
