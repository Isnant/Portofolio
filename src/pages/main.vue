<template class="mainClass">
  <div id="main" class="mainClass">
    <div class="row">
      <div class="col">
        <div style="margin-top:70px; margin-left:70px; margin-bottom:40px">
          <transition-group
            appear
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown"
            :duration="10000">
            <div key="text">
              <div class="row">
                <font color="white" class="my-font" size="8"><b>{{userInfo.firstName}}</b></font>
              </div>
              <div class="row">
                <font color="white" class="my-font" size="6"><b>{{userInfo.secondName}}</b></font>
              </div>
              <q-fab style="margin-right:10px" color="orange-7" icon="keyboard_arrow_down" direction="down" v-model="fab">
                <q-btn rounded color="orange-6" text-color="white" @click.native="doAbout()">
                  ABOUT
                  <q-tooltip>ABOUT</q-tooltip>
                </q-btn>
                <q-btn rounded color="orange-6" text-color="white" @click.native="doProfile()">
                  PROFILE
                  <q-tooltip>PROFILE</q-tooltip>
                </q-btn>
                <q-btn rounded color="orange-6" text-color="white" @click.native="doExperience()">
                  EXPERIENCE
                  <q-tooltip>EXPERIENCE</q-tooltip>
                </q-btn>
                <q-btn rounded color="orange-6" text-color="white" @click.native="doProjects()">
                  PROJECTS
                  <q-tooltip>PROJECTS</q-tooltip>
                </q-btn>
              </q-fab>
              <font color="white" class="my-font" size="4">{{userInfo.role}}</font>
            </div>
          </transition-group>
        </div>
        <div v-show="animated.coffee0" align="right">
          <img src="statics/coffee0.png" width="50%">
        </div>
        <div v-show="animated.coffee1" align="right">
          <img src="statics/coffee1.png" width="50%">
        </div>
        <div v-show="animated.coffee2" align="right">
          <img src="statics/coffee2.png" width="50%">
        </div>
        <div v-show="animated.coffee3" align="right">
          <img src="statics/coffee3.png" width="50%">
        </div>
      </div>
      <div class="col" style="margin-top:60px; margin-left:60px; margin-right:60px" >
         <transition
            appear
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown">
                <q-card v-show="show.about">
                  <q-card-section class="cardClass">
                    <font color="white" size="3">ABOUT</font><br>
                    <q-separator color="white" style="width: 5%;" />
                    <q-separator color="white" style="width: 5%; margin-bottom:20px" />
                    <font color="white" size="3">{{text.about}}</font>
                  </q-card-section>
                  <q-card-section class="cardClass">
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">.Net</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">C#</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Visual Basic</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Javascript</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Postgre SQL</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">My SQL</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">J Query</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">crystal reports</q-btn>
                    <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                  </q-card-section>
                </q-card>
          </transition>
          <transition
            appear
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown">
             <q-card v-show="show.profil">
              <q-card-section class="cardClass">
                <font color="white" class="my-font"  size="3">PROFILE</font><br>
                <q-separator color="white" style="width: 5%;" />
                <q-separator color="white" style="width: 5%; margin-bottom:20px" />
                <q-scroll-area
                dark
                style="height: 350px; max-width: 900px;">
                  <div class="row" style="margin-bottom:20px">
                    <div class="col-sm-3">
                      <img src="statics/foto3.png" width="100%">
                    </div>
                    <div class="col-sm-6" style="text-align:left; margin:10px">
                      <font color="white" class="my-font"  style="margin-top:50px" size="2">Ciamis, 10 Januari 1995</font><br>
                      <font color="white" class="my-font" size="2">isnantaufikkurrohman@gmail.com</font><br>
                      <font color="white" class="my-font" size="2">081220622819</font><br>
                      <q-icon color="white" name="pin_drop"></q-icon><font style="" color="white" class="my-font" size="2">Bandung, West Java</font><br>
                    </div>
                  </div>
                  <font color="white" class="my-font"  size="3">EDUCATION</font><br>
                  <q-separator color="white" style="width: 20%;" />
                  <div class="row">
                    <q-list class="rounded-borders">
                      <q-expansion-item
                        header-class="mainClass text-white"
                        caption-class="text-purple"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        dark
                        expand-separator
                        default-opened
                        :header-inset-level="0"
                        label="SILIWANGI UNIVERSITY"
                        dense>
                        <q-card>
                          <q-card-section>
                            <b>Master of Financial Management</b><br>
                            Tasikmalaya - West Java<br>
                            2022 - 2024<br>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        caption-class="text-purple"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        dark
                        expand-separator
                        default-opened
                        :header-inset-level="0"
                        label="XSIS ACADEMY"
                        dense>
                        <q-card>
                          <q-card-section>
                            <b>Bootcamp .Net Web Developer</b><br>
                            South Jakarta - Jakarta<br>
                            Aug - Oct 2017<br>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        caption-class="text-purple"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        dark
                        expand-separator
                        default-opened
                        :header-inset-level="0"
                        label="PADJADJARAN UNIVERSITY"
                        dense>
                        <q-card>
                          <q-card-section>
                            <b>Bachelor of Physics Instrumentation and Electronics</b><br>
                            Bandung - West Java<br>
                            2013 - 2017<br>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        caption-class="text-purple"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        dark
                        expand-separator
                        default-opened
                        :header-inset-level="0"
                        label="SMART EKSELENSIA INDONESIA"
                        dense>
                        <q-card>
                          <q-card-section>
                            <b>Junior - Senior High School</b><br>
                            Bogor - West Java<br>
                            2008 - 2013<br>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </div>
                  <!-- <div class="row">
                    <q-tree
                      color="white" class="my-font"
                      :nodes="simple"
                      accordion
                      node-key="label">
                      <template v-slot:default-header="prop">
                        <div class="row items-center">
                          <q-icon :name="prop.node.icon || ''" color="white" size="28px" class="q-mr-sm" />
                          <div class="text-weight text-white">{{ prop.node.label }}</div>
                        </div>
                      </template>
                      <template v-slot:default-body="prop">
                        <span class="text-weight-light text-black"></span>
                      </template>
                    </q-tree>
                  </div> -->
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </transition>
          <transition
            appear
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown">
            <!-- Wrapping only one DOM element, defined by QBtn -->
             <q-card v-show="show.experience">
              <q-card-section class="cardClass">
                <font color="white" class="my-font"  size="3">EXPERIENCE</font><br>
                <q-separator color="white" style="width: 10%;" />
                <q-separator color="white" style="width: 10%; margin-bottom:20px" />
                <q-scroll-area
                  dark
                  style="height: 350px; max-width: 900px;">
                  <div class="row">
                    <q-list bordered class="rounded-borders">
                      <q-expansion-item
                        header-class="mainClass text-white"
                        caption-class="text-purple"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        dark
                        expand-separator
                        default-opened
                        :header-inset-level="0"
                        label="PT Link Net Tbk"
                        caption="OCT 2019 - 2024"
                      >
                        <q-card>
                          <q-card-section>
                            Build and maintain several internal systems. New customer request system, named <b>Homepassed Information Update (HIU)</b>.
                            a system that regulates the flow of new customer requests by sales. Start from request, review, inspect, and appvove the request.
                            Then, build an asset management system, named <b>System of Equipment and Location (SEAL)</b>.
                            Recording all company asset data, the process of transferring assets, replacing assets, and other business processes related to assets.
                            Apart from these two projects, there are several other projects.
                            The project was carried out by a team consisting of a Systems Analyst, a Business Analyst, several Quality Assurance, and a Programmer.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Azure</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        expand-separator
                        label="PT Total Bangun Persada Tbk"
                        caption="FEB - OCT 2019"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            Continuing the development of an Enterprise Resource Planning system, named <b>"Construction Integrated System"</b>.
                            There are many modules for company operations, such as Assets Management, HSE, Finance, Project Management, etc.
                            In this period there was more focus on the Asset Management and Finance Divisions.
                            Create a data collection system, asset transfer system to track asset positions, create many accounting journals automatically.
                            The project was carried out by a team of around 30 people, consisting of Leaders, Programmers, Quality Assurance, Systems Analysts, and Business Analysts.
                            The system was built using the .Net MVC scheme, and combined with the company's internal framework
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">.Net</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">C#</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Visual Basic</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Javascript</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">J Query</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">crystal reports</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        expand-separator
                        label="PT Link Net Tbk"
                        caption="AUG 2018 - FEB 2019"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            Building <b>Email Listener</b> system, capturing alarms sent by all Link Net Tbk networks in Indonesia via email.
                            Data that matches the criteria is stored in a database and displayed on the web.
                            Email listeners are created to monitor certain disturbances according to company management needs.
                            The system was built using Java Springboot.
                            Build and Mantain <b>Ticket History</b> system. Recording, tracking, and displaying ticket data from other systems.
                            Projects are developed by a team containing Programmers, Quality Assurance, and Systems Analysts.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Postgre SQL</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        expand-separator
                        label="Lembaga Penjamin Simpanan"
                        caption="APR - MAY 2018"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            Created many reports and cooperation documents which were exported into Word templates.
                            The exported document get data from the company database, then maps it into the document.
                            This project was carried out with a Leader and 3 Programmers. The system was created using Visual Basic.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">.Net</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VISUAL BASIC</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">MS WORD</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">WORD DOCUMENT</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        expand-separator
                        label="PT Total Bangun Persada Tbk"
                        caption="OCT 2017 - MAR 2018"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            Developing an <b>Enterprise Resource Planning</b> system, named <b>Construction Integrated System</b>.
                            There are many modules for company operations, such as Assets Management, HSE, Finance, Project Management, etc.
                            In this period there was more focus on the approval management, master data, and data user security.
                            This project was carried out by a team of around 30 people, consisting of Leaders, Programmers, Quality Assurance, System Analysts and Business Analysts.
                            The system was built using the .Net MVC scheme, and combined with the company's internal framework.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">.Net</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">C#</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Visual Basic</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Javascript</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">J Query</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">crystal reports</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
         </transition>
         <transition
            appear
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown">
            <!-- Wrapping only one DOM element, defined by QBtn -->
             <q-card v-show="show.projects">
              <q-card-section class="cardClass">
                <font color="white" class="my-font"  size="3">PROJECTS</font><br>
                <q-separator color="white" style="width: 8%;" />
                <q-separator color="white" style="width: 8%; margin-bottom:20px" />
                <q-scroll-area
                  dark
                  style="height: 350px; max-width: 700px;">
                  <div class="row">
                    <q-list bordered class="rounded-borders">
                      <q-expansion-item
                        header-class="mainClass text-white"
                        caption-class="text-purple"
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        dark
                        default-opened
                        label="SEAL DASHBOARD – FULL STACK"
                        caption="PT Link Net Tbk"
                      >
                        <q-card>
                          <q-card-section>
                            SEAL is an abbreviation for <b>System of Equipment And Location</b>. Web applications built to manage various business processes related to asset management and their location.
                            Such as recording, updating, inactive, replacing equipment, and moving locations. All processes are managed using a system. This project built more than 15 transactions data,
                            more than 20 masters data, and several reports. Example Features: CRUD, Convert TXT file to Excel file, Download to Excel File, Upload data from Excel File.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Azure</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        header-class="mainClass text-white"
                        expand-separator
                        label="SEAL PROVISIONING – BACKEND"
                        caption="PT Link Net Tbk"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            Build a scheduled system to synchronize equipment data and others from IT department systems & databases
                            into the SEAL (System of Equipment And Location) database. The scheduler will run twice a day, at midnight and at midday.
                            Data that is already available in SEAL (System of Equipment And Location) will be updated.
                            New data will be entered into a draft to be reviewed and approved or rejected by the asset team.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Azure</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        header-class="mainClass text-white"
                        expand-separator
                        label="HIU DASHBOARD – FULL STACK"
                        caption="PT Link Net Tbk"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            <b>HIU (Homepassed Information Update)</b>, a system built to manage the process of new customer requests by sales in the field.
                            The process starts from a new installation request,, review, inspection, until the application is approved.
                            Sales can monitor the status of requests on the web application, and will receive this information in the form of email.
                            The system also provides various kinds of reports according to the company's internal needs.
                            The system consists of more than 15 masters data. More than 10 transactions data. And more than 10 reports.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Google Chart</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        header-class="mainClass text-white"
                        expand-separator
                        label="HIU SCHEDULER – BACKEND"
                        caption="PT Link Net Tbk"
                        dark
                      >
                        <q-card>
                          <q-card-section>
                            Scheduled system to mark data requests that have not been responded at <b>HIU (Homepassed Information Update)</b>
                            over the time limit. Data is tagged according to request type, Create Account, Update Address, Update Network, and Special Events.
                            All types of requests have their own time limits, according to the company's internal procedures.
                            This system also scheduled to synchronize some master data from the IT department database into the <b>HIU (Homepassed Information Update)</b> database.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        header-class="mainClass text-white"
                        expand-separator
                        label="API GATEWAY – BACKEND"
                        caption="PT Link Net Tbk"
                        dark>
                        <q-card>
                          <q-card-section>
                          Entry gateway all public APIs for <b>SEAL (System of Equipment And Location)</b> and <b>HIU (Homepassed Information Update),</b>
                          API gateway maps APIs to each controller, and generates tokens to be able to access APIs that require authentication in each system.
                          All API communications are recorded in a log for tracking and reporting purposes.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Jenkins</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        expand-separator
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        label="EASY – FULL STACK"
                        caption="PT Link Net Tbk"
                        dark>
                        <q-card>
                          <q-card-section>
                          <b>EASY (Employee Application System)</b>, a staffing system that regulates several needs of one of the divisions in the company regarding staffing.
                          This system regulates the recording and updating of data regarding all information related to employees, such as personal information, positions,
                          assignments, and inventory attached to the employee. This system is built with some master data, some transaction data, and some reports.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        expand-separator
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        label="TICKET HISTORY – FULL STACK"
                        caption="PT Link Net Tbk"
                        dark>
                        <q-card>
                          <q-card-section>
                          System that manages ticket history. Data is displayed as required in the web application.
                          Ticket data can be tracked and presented in reports.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VUE JS</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">QUASAR FRAMEWORK</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        expand-separator
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        label="EMAIL LISTENER – BACKEND"
                        caption="PT Link Net Tbk"
                        dark>
                        <q-card>
                          <q-card-section>
                          Build an <b>Email Listener</b> system, capturing and reading alarms sent by company internet networks from all over Indonesia by email.
                          The warning and error alarm status will be saved into the database.
                          Data will be displayed in the web application, and can be downloaded in the form of a report
                          </q-card-section><q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">JAVA</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Spring boot</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">PostgreSQL</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        expand-separator
                        class="overflow-hidden"
                        style="margin-top:10px; border-radius: 30px"
                        label="REPORT & DOCUMENT – BACKEND"
                        caption="Lembaga Penjamin Simpanan"
                        dark>
                        <q-card>
                          <q-card-section>
                          Build an <b>Email Listener</b> system, capturing and reading alarms sent by company internet networks from all over Indonesia by email.
                          The warning and error alarm status will be saved into the database.
                          Data will be displayed in the web application, and can be downloaded in the form of a report.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">.Net</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">VISUAL BASIC</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">MS WORD</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">WORD DOCUMENT</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-expansion-item
                        header-class="mainClass text-white"
                        expand-separator
                        class="overflow-hidden"
                        style="margin-top:10px; margin-bottom:20px; border-radius: 30px"
                        label="CIS – FULL STACK"
                        caption="Total Bangun Persada Tbk"
                        dark>
                        <q-card>
                          <q-card-section>
                          <b>CIS (Construction Integrated System)</b>. ERP system built by a construction company in Indonesia.
                          This system manages almost all of the company's business processes, starting from staffing, vendors, projects,
                          equipment, finance, HSE, etc. CIS was built by a team of 30 – 40 people. This project consists of a lot of master data,
                          transaction data, and reports.
                          </q-card-section>
                          <q-card-section>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">.Net</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">C#</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Visual Basic</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">Javascript</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">SQL Server</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">J Query</q-btn>
                            <q-btn outline size="sm" color="blue" rounded style="margin-left:5px; margin-top:5px">crystal reports</q-btn>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
         </transition>
      </div>
    </div>
  </div>
</template>

<script src="./js/main.js"></script>
<style scoped>
.my-font {
  font-family: 'poppinsfont';
}
.mainClass {
  background-color:  #061431;
}
.cardClass {
  background-color:  #103378;
}
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
</style>
