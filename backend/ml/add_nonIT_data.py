# add_nonIT_data.py
# ─────────────────────────────────────────────────────────────
#  Step 1: Adds synthetic non-IT resume samples to your dataset
#  Step 2: Retrains the model with balanced data
#  Step 3: Saves new resume_model.pkl and vectorizer.pkl
#
#  Run: python add_nonIT_data.py
# ─────────────────────────────────────────────────────────────

import pandas as pd
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from collections import Counter

nltk.download('stopwords', quiet=True)
nltk.download('wordnet',   quiet=True)

lemmatizer = WordNetLemmatizer()
stop_words  = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'[\+\(]?[1-9][0-9\s\-\(\)]{8,}[0-9]', '', text)
    text = re.sub(r'[^a-z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = [
        lemmatizer.lemmatize(w)
        for w in text.split()
        if w not in stop_words and len(w) > 2
    ]
    return ' '.join(tokens)


# ── Non-IT synthetic resume bank ──────────────────────────────
# Each entry is a realistic resume text for that category.
# We write 20 varied samples per category so the model learns
# diverse vocabulary, not just one template.

NON_IT_RESUMES = {

"Civil Engineer": [
    """site engineer construction concrete rcc reinforcement shuttering autocad surveying
    total station levelling road project subcontractor structural drawing BOQ bar bending
    IS 456 soil testing cement aggregate quality check supervised residential apartment
    foundation column beam slab project manager construction management site supervision
    civil engineering infrastructure development building construction material testing
    compressive strength test slump test concrete mix design water cement ratio
    plinth beam pile foundation raft foundation retaining wall drainage""",

    """civil engineer construction project management site supervision reinforced concrete
    autocad staad pro structural analysis design foundation soil bearing capacity
    surveying total station GPS levelling road construction highway bridge culvert
    quality control IS codes building material testing lab supervision
    quantity estimation BOQ rate analysis project scheduling MS project primavera
    safety management PPE site induction toolbox talk incident reporting
    drainage sewerage water supply plumbing coordination subcontractor management""",

    """junior civil engineer fresh graduate construction site supervision
    reinforced cement concrete shuttering centering bar bending schedule
    AutoCAD drawings structural drawings architectural drawings coordination
    surveying chain surveying compass traverse theodolite total station
    building construction residential commercial industrial project
    material inspection quality assurance testing cement steel aggregate
    IS 383 IS 1786 IS 2386 concrete mix M20 M25 M30 grade
    road work bituminous carpet surface dressing soil stabilization
    storm water drain retaining wall compound wall construction""",

    """construction engineer project site concrete quality control
    pile foundation deep excavation dewatering shoring earth work
    RCC framed structure load bearing masonry flat slab post tensioned
    building construction multi storey high rise residential commercial
    MEP mechanical electrical plumbing coordination drawing review
    shop drawings approval site instruction variation order
    progress report daily diary material approval submittal
    contractor subcontractor coordination client consultant interaction
    AutoCAD Revit basic BIM building information modeling awareness
    RERA construction regulation building bye laws FSI FAR knowledge""",

    """structural engineer design analysis reinforced concrete steel structure
    staad pro ETAP SAP2000 structural analysis software
    IS 456 IS 800 IS 875 load combinations dead load live load wind seismic
    foundation design isolated combined raft pile foundation
    beam column slab design RCC detailing bar bending schedule
    steel structure design connection bolt weld gusset plate
    industrial shed factory building structural steel fabrication
    AutoCAD structural drawing preparation submission approval
    site visit inspection quality audit structural defect assessment
    earthquake resistant design ductile detailing seismic zone""",

    """quantity surveyor estimation costing BOQ preparation rate analysis
    civil works earth work concrete masonry plaster painting flooring
    AutoCAD drawing measurement quantity take off
    material procurement scheduling vendor development
    subcontractor billing certification progress measurement
    project cost control budget monitoring variation management
    MS Excel MIS report preparation project tracking
    construction contract CPWD DSR schedule of rates
    tender preparation bid submission negotiation
    final account settlement defect liability period""",

    """highway engineer road construction pavement design
    flexible pavement rigid pavement bituminous concrete DBM BC WBM
    IRC standards road design geometric design alignment
    soil investigation subgrade CBR value pavement thickness design
    surveying road alignment total station drone survey
    bridge construction culvert box drain cross drainage work
    quality control field density test plate load test
    project management NHAI MORT&H specifications
    contract management milestone billing progress reporting""",

    """urban planner infrastructure development land use planning zoning
    master plan development plan town planning
    GIS mapping ArcGIS QGIS spatial analysis
    traffic study transport planning road network analysis
    drainage planning water supply sewerage network design
    building permission NOC coordination government liaison
    environmental impact assessment EIA clearance
    RERA real estate regulation construction law awareness
    public consultation stakeholder engagement report preparation""",

    """waterproofing specialist construction chemical application
    concrete repair rehabilitation strengthening
    epoxy injection grouting surface treatment
    waterproofing basement terrace podium swimming pool
    construction chemical Fosroc BASF Sika product knowledge
    surface preparation substrate assessment application method
    quality control inspection testing water ponding test
    project coordination contractor supervision client interaction
    technical presentation product specification writing""",

    """site supervisor construction foreman labour management
    daily progress monitoring material issue record
    concrete pouring shuttering reinforcement work supervision
    masonry brickwork plastering tiling flooring supervision
    safety compliance PPE usage tool box talk daily safety check
    labour attendance muster roll maintenance
    material inward outward register petty cash voucher
    coordination with engineer contractor subcontractor
    reading drawing measurement site marking layout
    quality inspection snagging defect identification""",

    """project manager construction infrastructure residential commercial
    planning scheduling resource management team leadership
    client contractor coordination dispute resolution
    MS project primavera scheduling bar chart network diagram
    budget control cost monitoring variation claims
    quality management system ISO 9001 construction quality plan
    safety health environment SHE management OHSAS
    contract management FIDIC conditions of contract
    progress review meeting minutes action tracking
    project closeout handover completion certificate""",

    """environmental engineer EIA environmental impact assessment
    pollution control water treatment sewage treatment plant
    solid waste management landfill design
    air quality monitoring noise pollution assessment
    IS standards EPA CPCB guidelines compliance
    environmental clearance forest clearance NOC
    site environmental monitoring reporting
    green building IGBC GRIHA LEED awareness
    sustainability renewable energy solar installation basic
    rainwater harvesting groundwater recharge""",

    """geotechnical engineer soil investigation boring SPT BPT
    soil classification triaxial test consolidation test
    bearing capacity settlement analysis slope stability
    foundation recommendation pile design lateral load
    retaining wall design earth pressure
    ground improvement techniques preloading stone column
    IS 1892 IS 6403 IS 2131 standards
    boring log report writing recommendation
    AutoCAD site plan drawing laboratory testing supervision""",

    """building services engineer MEP coordination
    HVAC plumbing electrical fire fighting lift
    drawing review shop drawing approval
    coordination meeting clash detection
    Revit MEP BIM coordination AutoCAD
    specification writing BOQ preparation
    contractor supervision quality inspection
    commissioning testing balancing
    operation maintenance manual preparation
    handover building management system BMS""",

    """irrigation engineer canal design water resource management
    dam reservoir design hydrology flood estimation
    canal lining distributary minor major canal system
    irrigation scheduling crop water requirement
    groundwater development tube well borewell
    pump selection pipeline design distribution system
    IS standards CWC guidelines irrigation department
    survey levelling contour map preparation
    project report DPR preparation government liaison""",

    """construction safety officer safety management HSE
    risk assessment hazard identification job safety analysis
    safety audit inspection checklist compliance
    PPE personal protective equipment monitoring
    permit to work height work hot work confined space
    accident near miss incident reporting investigation
    safety training toolbox talk induction
    emergency response plan fire safety
    IS 18001 OHSAS 45001 safety standards
    legal compliance factory act building regulation""",

    """pavement engineer road maintenance repair rehabilitation
    pavement condition survey distress identification
    pothole patching overlay strengthening design
    bitumen emulsion cold mix hot mix plant operation
    quality control marshal test density check
    NHAI PWD municipal corporation road works
    contract supervision bill certification
    machinery deployment roller compactor paver finisher
    night work traffic management diversion plan""",

    """plumbing engineer water supply sanitary installation
    pipe sizing flow calculation pressure drop
    PVC CPVC GI MS pipe fitting valve selection
    water pump selection head calculation
    roof overhead sump underground tank design
    sewerage drainage slope grading manhole
    fire hydrant sprinkler system coordination
    NBC plumbing code IS standards
    site supervision installation testing commissioning
    contractor coordination material approval""",

    """construction estimator cost estimation tender preparation
    rate analysis market rate material labour plant
    BOQ preparation civil structural finishing works
    AutoCAD quantity measurement take off
    MS Excel estimation sheet preparation
    vendor quotation comparison negotiation
    procurement planning material scheduling
    subcontractor work order preparation
    project cost monitoring budget variance reporting
    ERP SAP basic material management module""",

    """civil draftsman AutoCAD drawing preparation
    structural drawing architectural drawing
    plan elevation section detail drawing
    reinforcement drawing bar bending schedule
    road drawing alignment profile cross section
    drawing review revision update
    as built drawing preparation
    plotting printing file management
    site survey measurement basic
    coordination with engineer design team""",
],

"Mechanical Engineer": [
    """mechanical engineer production manufacturing cnc lathe milling
    solidworks autocad quality inspection cmm vernier caliper micrometer
    fmea control plan iatf spc statistical process control lean manufacturing
    5s kaizen preventive maintenance breakdown press shop scrap rejection
    automobile component manufacturing batch production fixture tooling
    GD&T geometric dimensioning tolerance surface finish roughness
    heat treatment hardness testing material selection steel aluminium
    pneumatic hydraulic system maintenance cylinder valve actuator
    production planning scheduling MRP ERP SAP manufacturing""",

    """design engineer product development mechanical design
    solidworks catia creo pro-e 3D modeling simulation analysis
    FEA finite element analysis ansys structural thermal
    mechanism design kinematics dynamics stress analysis
    tolerance stackup assembly drawing BOM bill of materials
    prototype development testing validation
    DFM design for manufacturing DFA design for assembly
    vendor development supplier quality engineering
    PPAP PSW FAI first article inspection
    APQP advanced product quality planning automotive""",

    """maintenance engineer industrial maintenance plant maintenance
    preventive predictive maintenance schedule
    rotating equipment pump compressor blower motor gearbox
    vibration analysis thermography oil analysis condition monitoring
    bearing replacement seal replacement coupling alignment
    hydraulic pneumatic system maintenance troubleshooting
    welding fabrication cutting grinding basic workshop skills
    electrical basic motor starter panel maintenance
    spare parts management inventory control
    breakdown maintenance MTTR MTBF OEE overall equipment effectiveness""",

    """quality engineer quality control inspection
    incoming in-process final inspection
    measuring instruments coordinate measuring machine CMM
    vernier caliper micrometer height gauge dial gauge
    surface roughness tester hardness tester
    destructive nondestructive testing NDT
    ultrasonic magnetic particle liquid penetrant radiography
    ISO 9001 iatf 16949 quality management system
    corrective action preventive action CAPA 8D report
    statistical process control control chart Cpk
    supplier audit vendor assessment quality improvement""",

    """HVAC engineer heating ventilation air conditioning
    chiller AHU FCU ducting refrigerant piping
    psychrometric calculation load calculation heat load
    ASHRAE standards energy efficiency EER COP
    VAV VRF split AC centralized cooling system
    commissioning testing balancing air flow measurement
    BMS building management system integration
    AutoCAD MEP drawing preparation
    installation supervision coordination
    AMC annual maintenance contract service management""",

    """automobile engineer vehicle development testing
    engine transmission suspension braking system
    powertrain chassis body design
    NVH noise vibration harshness testing
    FMEA failure mode effect analysis DFMEA PFMEA
    validation testing durability endurance
    OBD diagnostics vehicle emission BS6 compliance
    CAE computer aided engineering crash simulation
    supplier development prototype manufacturing
    homologation type approval AIS CMVR standards""",

    """welding engineer fabrication structural welding
    MIG MAG TIG SMAW FCAW welding process
    weld procedure specification WPS PQR welder qualification
    AWS ASME standards welding inspection
    NDT visual dye penetrant ultrasonic radiography
    distortion control preheat post weld heat treatment PWHT
    pressure vessel storage tank pipeline fabrication
    material certification mill test report
    QC inspection documentation radiography film interpretation
    fit up assembly dimensional check final inspection""",

    """thermal engineer heat transfer thermodynamics
    heat exchanger design shell tube plate fin
    LMTD effectiveness NTU method
    boiler pressure vessel design unfired pressure vessel
    IBR Indian boiler regulation ASME section VIII
    insulation calculation thermal resistance
    piping stress analysis Caesar II
    steam system condensate recovery
    energy audit heat balance
    cooling tower performance efficiency calculation""",

    """tool design engineer jig fixture design
    press tool die design stamping forming
    mold design injection molding die casting
    solidworks die design progressive tool
    material selection tool steel HSS carbide
    surface treatment PVD coating heat treatment
    tryout first article inspection dimensional
    tool room CNC EDM wire cut grinding
    tolerance stackup assembly clearance
    vendor management tool procurement import""",

    """project engineer capital project management
    equipment procurement installation commissioning
    piping mechanical equipment foundation civil
    P&ID drawing review approval
    FAT factory acceptance test SAT site acceptance
    hook up commissioning punch list
    project schedule Gantt chart milestone tracking
    contract management vendor coordination
    budget control cost monitoring variation
    handover documentation as built drawing""",

    """energy engineer energy audit conservation
    energy baseline monitoring targeting
    power factor correction capacitor bank
    motor efficiency pump system optimization
    compressed air system leak detection
    waste heat recovery steam trap survey
    LED lighting retrofit
    ISO 50001 energy management system
    energy saving project implementation ROI calculation
    ESCO energy service company project management""",

    """refrigeration engineer cold storage freezer
    compressor condenser evaporator expansion valve
    refrigerant R22 R134a R404a R410a
    cooling load calculation insulation thickness
    ammonia industrial refrigeration
    maintenance troubleshooting leak detection
    food processing cold chain temperature monitoring
    HACCP food safety cold chain compliance
    installation commissioning testing
    preventive maintenance service contract""",

    """fluid power engineer hydraulic pneumatic system
    hydraulic pump motor cylinder valve manifold
    pneumatic compressor cylinder valve FRL unit
    circuit design simulation FluidSIM software
    Parker Bosch Rexroth Festo component selection
    seal kit replacement cylinder repair
    pressure setting flow control troubleshooting
    mobile hydraulic system excavator crane
    industrial automation hydraulic press
    documentation circuit diagram maintenance manual""",

    """manufacturing process engineer
    process planning routing operation sequence
    CNC programming G code M code turning milling
    Mastercam EdgeCAM CAM software
    cutting tool selection speed feed depth of cut
    fixture design setup reduction SMED
    process capability Cpk process improvement
    lean manufacturing value stream mapping waste elimination
    cycle time reduction productivity improvement
    poka yoke mistake proofing error prevention""",

    """plant engineer utilities management
    compressed air steam cooling water
    DG diesel generator electrical supply
    effluent treatment plant ETP STP operation
    boiler operation IBR certified
    chiller cooling tower operation maintenance
    fire fighting system hydrant sprinkler
    safety permit to work system
    statutory compliance factory act pressure vessel
    energy monitoring utility cost reduction""",

    """piping engineer process piping design
    P&ID piping instrument diagram
    pipe sizing pressure drop calculation
    material selection carbon steel alloy SS
    ASME B31.3 process piping standard
    isometric drawing preparation AutoCAD
    stress analysis Caesar II basic
    support design hanger guide anchor
    flanged welded threaded connection
    hydro test pressure test flushing
    insulation painting specification""",

    """material engineer metallurgy testing
    ferrous non ferrous material selection
    heat treatment annealing quenching tempering
    case hardening surface treatment plating coating
    failure analysis fractography SEM EDS
    mechanical testing tensile impact fatigue
    hardness Rockwell Vickers Brinell
    corrosion protection galvanizing painting
    weld material consumable selection
    material certification test report review""",

    """safety engineer mechanical safety
    machine guarding safety device
    pressure relief valve safety valve
    lifting equipment inspection crane rigging
    pressure vessel inspection statutory
    PESO CIG IBR inspection certification
    work permit system hazard identification
    HAZOP study process safety review
    process safety management PSM
    mechanical integrity inspection program""",

    """research development engineer innovation
    concept development ideation prototype
    design of experiment DOE Taguchi
    material testing characterization
    failure investigation corrective action
    patent documentation intellectual property
    technical paper writing publication
    benchmark competitive analysis
    cost reduction value engineering
    new product introduction NPI process""",

    """production planning engineer
    master production schedule MPS
    material requirement planning MRP
    capacity planning loading balancing
    shop floor control WIP monitoring
    SAP PP production planning module
    daily production meeting review
    delivery commitment customer schedule
    inventory management safety stock
    bottleneck analysis throughput improvement
    OTIF on time in full delivery performance""",
],

"Electrical Engineering": [
    """electrical engineer substation transformer circuit breaker relay protection
    HT LT panel switchgear cable termination earthing SCADA PLC Allen Bradley
    energy audit load calculation single line diagram AutoCAD electrical
    megger earth tester thermal imaging IS standards IE rules motor control center MCC
    power distribution 11KV 33KV 132KV transmission line
    protection relay differential overcurrent earth fault
    control panel wiring testing commissioning
    energy meter power factor correction capacitor bank
    DG diesel generator UPS battery system maintenance""",

    """power systems engineer generation transmission distribution
    load flow study short circuit analysis protection coordination
    ETAP PSCAD power system simulation software
    transformer testing oil testing DGA dissolved gas analysis
    switchgear maintenance SF6 vacuum circuit breaker
    bus bar relay panel testing calibration
    SCADA EMS energy management system
    grid connectivity renewable energy integration
    power quality harmonic analysis THD
    substation automation IEC 61850 GOOSE message""",

    """instrumentation control engineer
    PLC SCADA DCS distributed control system
    Siemens Honeywell ABB Yokogawa Rockwell
    PID controller loop tuning
    flow level pressure temperature measurement
    transmitter sensor field instrument calibration
    P&ID drawing interpretation control valve sizing
    hazardous area ATEX zone classification
    SIS safety instrumented system SIL
    HART FOUNDATION fieldbus Profibus communication
    control room console HMI SCADA programming""",

    """automation engineer industrial automation
    PLC programming ladder logic function block
    Siemens S7 Allen Bradley ControlLogix
    SCADA WinCC FactoryTalk Wonderware
    servo drive VFD variable frequency drive
    motion control robot integration
    conveyor packaging assembly line automation
    sensor proximity photoelectric encoder
    pneumatic actuator solenoid valve
    electrical panel design wiring drawing
    factory acceptance test commissioning""",

    """electrical design engineer
    AutoCAD electrical SLD cable schedule
    load calculation motor load HVAC load lighting load
    cable sizing short circuit calculation
    protection relay setting coordination
    earthing lightning protection design
    IS 732 IE rules NBC electrical
    transformer selection HT LT switchgear selection
    UPS battery sizing critical load
    solar PV system design net metering
    electrical drawing review approval submission""",

    """solar energy engineer renewable energy
    solar PV system design installation
    on grid off grid hybrid system
    string inverter central inverter microinverter
    shadow analysis PVSyst simulation
    mounting structure civil foundation
    DC cable sizing AC cable sizing protection
    net metering grid interconnection approval
    MNRE CERC SERC regulation compliance
    performance monitoring yield assessment
    operation maintenance cleaning inspection""",

    """EPC electrical contractor project execution
    HT LT substation erection commissioning
    transformer installation testing
    switchgear panel installation wiring
    cable laying termination glanding
    bus duct cable tray ladder installation
    earthing strip electrode installation
    DG set synchronizing panel
    lighting external street light
    testing commissioning inspection report
    CEIG approval electrical inspector compliance""",

    """building electrician site electrical work
    wiring conduit concealed surface
    MCB RCCB ELCB selection installation
    distribution board DB panel wiring
    earthing protection system
    lighting power point fan AC socket
    cable sizing current carrying capacity
    IS 732 installation standard
    fire alarm system basic PA system
    coordination with civil architect
    testing megger insulation resistance check""",

    """electrical maintenance engineer
    preventive breakdown maintenance
    motor rewinding repair testing
    transformer maintenance oil filtration BDV test
    switchgear maintenance CB testing
    protection relay testing injection
    battery charger UPS maintenance
    capacitor bank maintenance power factor
    energy monitoring demand management
    CMMS computerized maintenance management
    spare inventory management critical spares""",

    """high voltage engineer EHV transmission
    400KV 220KV transmission line tower
    stringing conductor ACSR bundled conductor
    insulator disc string hardware fitting
    substation AIS GIS gas insulated
    transformer bushing CT PT maintenance
    protection distance relay differential relay
    SCADA RTU communication
    live line maintenance hot line tool
    annual maintenance inspection tower patrol""",

    """electrical testing commissioning engineer
    factory acceptance test site acceptance test
    transformer ratio vector group polarity test
    circuit breaker timing travel measurement
    protection relay testing injection kit
    insulation resistance megger test
    high voltage withstand test
    earth resistance fall of potential test
    partial discharge measurement
    power cable testing VLF
    test report documentation punch list""",

    """facility electrical engineer
    building electrical maintenance management
    energy audit monitoring targeting
    power quality monitoring harmonic filter
    backup power DG UPS management
    lighting management LED retrofit
    HVAC electrical coordination
    BMS building management system
    electrical safety audit compliance
    contractor supervision AMC management
    electricity tariff management bill audit""",

    """electrical project engineer
    project planning execution monitoring
    material procurement inspection
    vendor development approval
    site coordination civil mechanical
    drawing review markup approval
    progress monitoring billing certification
    commissioning testing snag list
    as built drawing preparation
    handover documentation training
    project closure post mortem learning""",

    """drives control engineer
    variable frequency drive VFD selection
    Danfoss ABB Siemens Yaskawa drives
    drive programming parameter setting
    soft starter star delta DOL starter
    motor protection relay thermistor PTC
    regenerative braking energy recovery
    harmonic filter active passive
    commissioning speed control torque control
    pump fan compressor application
    field weakening position control""",

    """electrical safety officer
    arc flash hazard analysis NFPA 70E
    lockout tagout LOTO procedure
    work permit electrical isolation
    live dead live testing sequence
    PPE insulated gloves mat tools
    electrical safety audit compliance
    shock burn hazard awareness training
    earth fault circuit breaker RCD
    emergency response electrical accident
    IE Act CEA regulation compliance""",

    """wind energy engineer
    wind turbine installation commissioning
    gearbox generator nacelle hub blade
    SCADA turbine monitoring alarm
    transformer HT substation wind farm
    grid code compliance reactive power
    wind resource assessment P50 P90
    preventive maintenance inspection
    rotor blade inspection GRP repair
    crane operation coordination
    CERC SERC wind energy regulation""",

    """electrical estimator tender preparation
    material takeoff cable transformer switchgear
    rate analysis market quotation
    BOQ preparation electrical works
    substation HT LT panel cable
    earthing lightning protection
    MS Excel estimation sheet
    vendor negotiation procurement
    variation order extra item
    project cost monitoring budget""",

    """control system engineer process control
    distributed control system DCS
    Honeywell Experion Yokogawa CS3000
    ABB 800xA control system
    function block programming structured text
    batch control ISA 88 standard
    alarm management rationalization
    historian OSI PI data management
    advanced process control APC
    MES manufacturing execution system integration
    cybersecurity industrial network""",

    """railway electrical engineer
    traction power supply 25KV overhead equipment
    OHE catenary contact wire registration
    25KV substation auto transformer feeding
    SCADA train control management system
    signal interlocking relay based electronic
    track circuit axle counter
    station power supply lighting HVAC
    earthing bonding stray current
    RDSO specification CEA regulation
    maintenance inspection regime""",

    """electrical quality engineer
    material inspection test certificate review
    transformer factory test witness
    switchgear routine type test
    cable drum test insulation resistance
    third party inspection expediting
    ITP inspection test plan preparation
    NCR non conformance report
    weld inspection painting inspection
    packing dispatch inspection
    vendor audit quality assessment""",
],

"Electronics Communication Engineering": [
    """electronics engineer embedded systems arduino microcontroller
    PCB circuit design verilog VHDL VLSI CMOS digital electronics
    signal processing MATLAB oscilloscope function generator
    ESP8266 IoT sensor relay motor communication protocol UART SPI I2C
    8051 ARM cortex assembly language C programming
    RF communication antenna design transmission
    op amp filter amplifier analog circuit
    FPGA Xilinx Altera digital design
    satellite communication fiber optic networking""",

    """VLSI design engineer digital IC design
    RTL design Verilog VHDL system verilog
    synthesis place route Cadence Synopsys
    timing closure STA static timing analysis
    DRC LVS physical verification
    memory design SRAM ROM flip flop latch
    clock domain crossing metastability
    low power design clock gating power gating
    verification UVM testbench simulation
    tape out sign off chip design flow""",

    """RF microwave engineer antenna design
    RF circuit design amplifier filter oscillator
    HFSS CST ADS simulation
    microwave transmission satellite link
    radar system design signal processing
    propagation path loss link budget
    5G NR LTE WLAN Bluetooth RF standard
    spectrum analyzer VNA network analyzer
    EMI EMC testing compliance
    PCB RF layout substrate material
    measurement characterization test""",

    """embedded software engineer firmware development
    microcontroller STM32 PIC AVR ESP32
    RTOS FreeRTOS real time operating system
    device driver development BSP
    communication protocol UART SPI I2C CAN USB
    bootloader OTA firmware update
    bare metal programming register level
    debugging JTAG SWD logic analyzer
    power management sleep mode low power
    sensor integration ADC DAC PWM
    IoT cloud MQTT AWS IoT Azure""",

    """signal processing engineer DSP algorithm
    MATLAB Python signal processing
    FFT filter FIR IIR design
    speech processing audio codec
    image processing computer vision OpenCV
    machine learning signal classification
    FPGA implementation DSP processor
    TMS320 DSP programming
    communication system modulation OFDM
    noise cancellation adaptive filter
    radar sonar signal processing application""",

    """telecom engineer network planning optimization
    2G 3G 4G LTE 5G NR technology
    BTS NodeB eNB gNB installation commissioning
    coverage capacity planning drive test
    frequency planning interference management
    KPI monitoring optimization tuning
    MIMO beamforming massive MIMO
    core network EPC 5GC IMS VoLTE
    fiber optic SDH DWDM transmission
    microwave backhaul link planning
    OSS BSS network management system""",

    """power electronics engineer converter design
    DC DC converter buck boost flyback
    inverter PWM control MPPT
    IGBT MOSFET gate driver circuit
    motor drive BLDC PMSM induction motor
    battery management system BMS
    EV electric vehicle charger
    solar inverter grid tie
    harmonic filter power factor correction
    thermal management heat sink design
    EMI filter compliance testing""",

    """PCB design engineer layout
    Altium Designer Eagle KiCad
    schematic capture component selection
    multilayer PCB high speed design
    impedance control differential pair
    EMI EMC design guidelines
    component placement routing DRC
    gerber file fabrication drawing
    prototype assembly SMD through hole
    BOM bill of materials procurement
    IPC standard PCB quality inspection""",

    """control systems engineer automatic control
    PID controller design tuning
    state space model transfer function
    root locus bode plot nyquist
    MATLAB Simulink control design
    digital control Z transform sampled data
    servo motor stepper motor control
    position velocity control loop
    sensor feedback encoder resolver
    motion control automation
    industrial robot kinematics dynamics""",

    """optical fiber engineer fiber optic network
    single mode multimode fiber
    OTDR measurement connector splicing
    OLT ONU GPON EPON network
    WDM DWDM CWDM multiplexing
    optical amplifier EDFA Raman
    fiber installation pulling blowing
    splice enclosure distribution box
    fiber to home FTTH deployment
    network testing troubleshooting
    transmission equipment Cisco Huawei ZTE""",

    """instrumentation biomedical engineer
    medical device ECG EMG EEG signal
    patient monitor vital signs
    biosensor electrode transducer
    amplifier filter AD8232 instrumentation amp
    wireless health monitoring IoT
    DICOM medical imaging standard
    FDA IEC 60601 medical device standard
    embedded C medical device programming
    clinical trial testing validation
    regulatory compliance CE marking MDR""",

    """automation test engineer electronic testing
    automated test equipment ATE
    LabVIEW TestStand test automation
    boundary scan JTAG ICT in circuit test
    functional test fixture flying probe
    oscilloscope spectrum analyzer DMM
    test plan test case test report
    defect analysis failure investigation
    production test time reduction
    yield improvement quality metrics
    HALT HASS reliability testing""",

    """satellite communication engineer
    VSAT satellite terminal installation
    antenna pointing azimuth elevation polarization
    DVB-S2 modulation demodulation
    Ku Ka C band frequency plan
    link budget EIRP G/T
    satellite internet broadband service
    teleport hub station operation
    NOC network operations center monitoring
    SCPC MCPC carrier configuration
    interference hunting resolution
    antenna mounting alignment verification""",

    """avionics engineer aircraft electronics
    avionic system LRU line replaceable unit
    DO-178 DO-254 aerospace standard
    ARINC 429 629 MIL-STD 1553 bus
    GPS navigation INS inertial navigation
    flight management system FMS
    radar altimeter transponder ADS-B
    environmental testing DO-160
    safety analysis FHA FMEA FTA
    certification testing ground test flight test
    maintenance troubleshooting CMM component""",

    """consumer electronics engineer product development
    smart TV set top box audio video
    HDMI USB 3.0 WiFi Bluetooth
    SoC application processor Qualcomm MediaTek
    Android Linux BSP development
    multimedia codec video encoding
    display panel LCD OLED driver
    power management IC PMIC
    EMC testing FCC CE certification
    mass production test yield
    failure analysis corrective action""",

    """IoT engineer internet of things
    sensor node gateway cloud platform
    LoRaWAN Zigbee Z-Wave WiFi BLE
    AWS IoT Azure IoT Hub Google Cloud
    MQTT CoAP HTTP REST API
    edge computing fog computing
    OTA over the air update
    security TLS encryption certificate
    device provisioning fleet management
    dashboard visualization Grafana
    industrial IoT smart factory agriculture""",

    """network engineer telecommunications
    routing switching CCNA CCNP
    TCP IP OSI model protocol
    router switch firewall configuration
    VLAN trunk STP spanning tree
    OSPF BGP routing protocol
    VPN IPSec SSL remote access
    network monitoring SNMP Nagios Zabbix
    fiber copper wireless network
    troubleshooting packet capture Wireshark
    data center network rack cabling""",

    """radar sonar system engineer
    radar signal processing Doppler
    pulse radar FMCW radar
    target detection tracking
    clutter suppression MTI filter
    phased array antenna beamforming
    DSP FPGA implementation
    MATLAB simulation modeling
    sonar underwater acoustic
    signal to noise ratio detection probability
    electronic warfare countermeasure""",

    """semiconductor process engineer
    wafer fabrication lithography etching
    deposition CVD PVD ALD
    diffusion ion implantation annealing
    CMP chemical mechanical planarization
    yield enhancement defect reduction
    process integration technology node
    SEM TEM EDX characterization
    statistical process control SPC
    CMOS DRAM flash memory process
    clean room protocol contamination control""",

    """electronic warfare cyber security engineer
    signal intelligence SIGINT ELINT
    spectrum monitoring ESM system
    jamming electronic attack EA
    cryptography encryption secure communication
    network security penetration testing
    vulnerability assessment security audit
    MIL standard defense equipment
    system integration test qualification
    security clearance classified project
    defense procurement DPP DRDO HAL""",
],
}

# ── Build dataframe from synthetic samples ─────────────────────

print("Building synthetic non-IT resume dataset...")

rows = []
for category, texts in NON_IT_RESUMES.items():
    for text in texts:
        rows.append({
            'Category':     category,
            'Resume':       text,
            'Cleaned_Text': clean_text(text),
        })

new_df = pd.DataFrame(rows)
print(f"  Synthetic samples: {len(new_df)}")
print(f"  Per category: {new_df['Category'].value_counts().to_dict()}")

# ── Load existing dataset ──────────────────────────────────────

print("\nLoading existing dataset...")
existing_df = pd.read_csv('final_dataset.csv')
print(f"  Existing samples: {len(existing_df)}")

# Show current Testing count (the culprit)
cat_counts = existing_df['Category'].value_counts()
print(f"\n  Top 5 most common categories (existing):")
for cat, cnt in cat_counts.head(5).items():
    print(f"    {cat}: {cnt}")

# ── Balance overrepresented categories ────────────────────────

print("\nBalancing overrepresented categories...")

# Cap each existing category at 150 samples max
MAX_PER_CLASS = 150
balanced_rows = []
for cat, group in existing_df.groupby('Category'):
    if len(group) > MAX_PER_CLASS:
        balanced_rows.append(group.sample(MAX_PER_CLASS, random_state=42))
    else:
        balanced_rows.append(group)

balanced_df = pd.concat(balanced_rows, ignore_index=True)
print(f"  After balancing: {len(balanced_df)} samples")

# ── Map new category names to existing ones if needed ──────────

# Rename new categories to match existing model class names
CATEGORY_MAP = {
    'Electronics Communication Engineering': 'Electrical Engineering',
}
new_df['Category'] = new_df['Category'].replace(CATEGORY_MAP)

# ── Merge datasets ─────────────────────────────────────────────

combined_df = pd.concat([balanced_df, new_df], ignore_index=True)
combined_df = combined_df.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"\nCombined dataset: {len(combined_df)} samples")
print("\nCategory distribution (new):")
for cat, cnt in combined_df['Category'].value_counts().items():
    print(f"  {cat}: {cnt}")

# ── Retrain ────────────────────────────────────────────────────

print("\nRetraining model...")

X = combined_df['Cleaned_Text']
y = combined_df['Category']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Retrain vectorizer — bigger vocab to capture domain words
vectorizer = TfidfVectorizer(
    max_features=8000,
    ngram_range=(1, 2),
    min_df=1,           # include even rare domain words
    sublinear_tf=True,  # log normalization
)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec  = vectorizer.transform(X_test)

# Retrain model
model = LogisticRegression(
    max_iter=2000,
    C=1.0,
    class_weight='balanced',  # handles remaining imbalance
    solver='lbfgs',
    multi_class='multinomial',
)
model.fit(X_train_vec, y_train)

# Evaluate
accuracy = model.score(X_test_vec, y_test)
print(f"\nNew model accuracy: {accuracy*100:.2f}%")

# Per-category accuracy on non-IT categories
print("\nNon-IT category performance:")
y_pred = model.predict(X_test_vec)
report = classification_report(y_test, y_pred, output_dict=True)

nonIT = ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineering']
for cat in nonIT:
    if cat in report:
        r = report[cat]
        print(f"  {cat:<30} precision={r['precision']:.2f}  recall={r['recall']:.2f}  f1={r['f1-score']:.2f}")

# ── Verify domain words now in vocabulary ─────────────────────

print("\nVocabulary check — domain words:")
vocab = vectorizer.vocabulary_

checks = {
    'Civil'     : ['concrete', 'rcc', 'reinforcement', 'surveying', 'autocad', 'substation_wrong'],
    'Mechanical': ['cnc', 'solidworks', 'fmea', 'kaizen', 'lathe'],
    'Electrical': ['substation', 'switchgear', 'scada', 'earthing', 'transformer'],
    'ECE'       : ['arduino', 'microcontroller', 'verilog', 'vlsi', 'pcb'],
}

for domain, words in checks.items():
    found   = [w for w in words if w in vocab]
    missing = [w for w in words if w not in vocab]
    print(f"  {domain}: ✅ {found}  ❌ missing: {missing}")

# ── Save ───────────────────────────────────────────────────────

joblib.dump(model,      'resume_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print("\n✅ Saved resume_model.pkl and vectorizer.pkl")
print("   Restart uvicorn and test again!")
print("\nDone! Run: uvicorn main:app --reload --port 8000")