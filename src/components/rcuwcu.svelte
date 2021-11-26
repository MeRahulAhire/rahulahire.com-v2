<script>
    import '../style/rcuwcu.css'

    const rcu = () => {
        const rps = document.getElementById('rps')
    const size = document.getElementById('size')
    const submit = document.getElementById('submit')
    const select = document.getElementById('select')
    if(select.value === '') alert ('Select consistency mode')
        if(select.value !== '' && rps.value === ''){
            alert('Enter the no. of request/Sec')
        }
        if(rps.value !== '' && size.value === ''){
            alert('Enter the size of item')
        }
        if((rps.value !== "" && isFinite(`${rps.value}`) === false) || (size.value !== "" && isFinite(`${size.value}`) === false)){
            alert('Entered value is not a number')
        }

        const result = (rps.value * Math.round(size.value) / (4 * select.value)) + 1
        
        const resDisplay = document.getElementById('result')
        resDisplay.style.display = 'flex'
        resDisplay.innerHTML = `Total RCU = <div  >${result}</div>`
    }
    const wcu = () => {
        const rpsWcu = document.getElementById('rps-wcu')
    const sizeWcu = document.getElementById('size-wcu')
    const submitWcu = document.getElementById('submit-wcu')
    if(rpsWcu.value === ''){
            alert('Enter the no. of request/Sec')
            
        }
        if(rpsWcu.value !== '' && sizeWcu.value === ''){
            alert('Enter the size of item')
            
        }
        if((rpsWcu.value !== "" && isFinite(`${rpsWcu.value}`) === false) || (sizeWcu.value !== "" && isFinite(`${sizeWcu.value}`) === false)){
            alert('Entered value is not a number')
            
        }

        const result = rpsWcu.value * Math.round(sizeWcu.value)
        const resDisplay = document.getElementById('result-wcu')
        resDisplay.style.display = 'flex'
        resDisplay.innerHTML = `Total WCU = <div  >${result}</div>`
    }
</script>



<div class="container">
    <div class="top">
       <div class="top-wrap">
        A free tool to calculate the throughput in DynamoDB <br>
        <a href="https://letsfigureout.com/2020/02/01/calculating-wcu-and-rcu-for-amazon-dynamodb/" target="_blank" rel="noopener noreferrer">based on this article.</a>
       </div>
    </div>
    <div class="flex-box">
        <div class="box">
            <div class="box-wrap">
                <div class="head">Calculate Read Capacity Units</div>
                <div class="select">
                    Select the consistency mode
                <select name="select" id="select" class="choose">
                    <option value="" hidden>Select</option>
                    <option value="1">Strong consistency</option>
                    <option value="2">Eventual consistency</option>
                </select>
                </div>
                <div class="req">
                    No. of Request per second
                    <input type="tel" id="rps" placeholder="100">
                </div>
                <div class="req">
                    Average size of each item in KB
                    <input type="tel" id="size" placeholder="4">
                </div>
                <div class="submit">
                    <button id="submit" on:click={rcu}>Get RCU</button>
                    <div class="res" id="result">
                        Total WCU = <div  >ss</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box wcu-box">
            <div class="box-wrap wrap-wcu">
                <div class="head">Calculate Write Capacity Units</div>
                
                <div class="req">
                    No. of Request per second
                    <input type="tel" id="rps-wcu" placeholder="50">
                </div>
                <div class="req">
                    Average size of each item in KB
                    <input type="tel" id="size-wcu" placeholder="4">
                </div>
                <div class="submit">
                    <button id="submit-wcu" on:click={wcu}>Get WCU</button>
                    <div class="res" id="result-wcu">
                        Total WCU = <div  >ss</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tweet-box">
        Loved this tool, then <a href="https://twitter.com/intent/tweet?url=https://rahulahire.com/dynamodb-wrcu" target="_blank" rel="noopener noreferrer">Tweet it.</a>
    </div>
</div>