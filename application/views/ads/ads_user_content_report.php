<!--div class="wrapper row-offcanvas row-offcanvas-left"-->
    <!-- Right side column. Contains the navbar and content of the page -->
    <aside class="content-wrapper"> 
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1><?php echo $welcome->loadPo('User campaign Report') ?><small><?php echo $welcome->loadPo('Control panel') ?></small></h1>
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url(); ?>ads_analytics/report"><i class="fa fa-dashboard"></i><?php echo $welcome->loadPo('Ads Analytics') ?></a></li>
                <li><a href="<?php echo base_url(); ?>ads_analytics/user"><?php echo $welcome->loadPo('User wise report') ?></a></li>
		<li class="active"><?php echo $content[0]->customer_name;?></li>
            </ol>
        </section>
        <div>
            <div id="msg_div">
                <?php echo $this->session->flashdata('message'); ?>
            </div>	
            <?php if (isset($error) && !empty($error)) { ?><div id="msg_div"><?php echo $error; ?></div><?php } ?>
        </div>
        <!-- Main content -->
        <section class="content">
            <?php $search = $this->session->userdata('search_form');
           // $search = $_GET;
            ?></pre>
            <div id="content">
                <!-- form start -->
                <form  method="post" action="" onsubmit="return date_check();" id="searchIndexForm" name="searchIndexForm" accept-charset="utf-8">
                <div class="row">
                    <!-- left column -->
                    <div class="col-md-12">
                        <!-- general form elements -->
                        <div class="box box-primary collapsed-box">
                        <div class="box-header">
                            <!-- tools box -->
                            <div class="pull-right box-tools">
                                <button class="btn btn-danger btn-sm" data-widget='collapse' data-toggle="tooltip" title="Collapse"><i class="fa fa-plus"></i></button>
                            </div><!-- /. tools -->
                            <h3 class="box-title">Search</h3>
                        </div>    
                            
                                <div style="display:none;"><input type="hidden" name="id" value="<?php echo $userid;?>"/></div>
                                <div class="box-body" style="display:none;">
                                    <div class="row">
                                        <div class="form-group col-lg-4">
                                            <div class="input text">
                                                <label for=""><?php echo $welcome->loadPo('Title') ?></label>
                                                <input type="text" name="title" id="title" class="form-control" value="<?php echo (isset($search['title'])) ? $search['title'] : ''; ?>" placeholder="<?php echo $welcome->loadPo('Title') ?>">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <div class="input select">
                                                <label for="searchCategory"><?php echo $welcome->loadPo('Advertiser') ?></label>
                                                <select name="contentprovider" class="form-control" placeholder="<?php echo $welcome->loadPo('Advertiser') ?>" id="contentprovider">
                                                    <option value=""><?php echo $welcome->loadPo('Select') ?></option>
                                                    <?php foreach ($content_provider as $row) { ?>
                                                        <option value="<?php echo $row->id; ?>" <?php
                                                        if (isset($search['contentprovider'])) {
                                                            if ($row->id == $search['contentprovider']) {
                                                                echo 'selected';
                                                            }
                                                        }
                                                        ?>  ><?php echo $row->name; ?></option>
                                                            <?php } ?>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <div class="input text">
                                                <label for=""><?php echo $welcome->loadPo('Location') ?></label>
                                                <input type="text"  placeholder="Search location..." autocomplete="off" name="country" id="country" class="form-control span4" value="<?php echo (isset($search['country'])) ? $search['country'] : ''; ?>" placeholder="<?php echo $welcome->loadPo('Location') ?>">
                                            </div>
                                        </div>
                                    </div>
				    <div class="row">
                                        <div class="form-group col-lg-4">
                                            <div class="input text">
                                                <label for=""><?php echo $welcome->loadPo('Operating System') ?></label>
                                                <input type="text" name="platform" id="platform" class="form-control" value="<?php echo (isset($search['platform'])) ? $search['platform'] : ''; ?>" placeholder="<?php echo $welcome->loadPo('Operating System') ?>">
                                            </div>
                                        </div>
					 <div class="form-group col-lg-4">
                                            <div class="input text">
                                                <label for=""><?php echo $welcome->loadPo('Browser') ?></label>
                                                <input type="text" name="browser" id="browser" class="form-control" value="<?php echo (isset($search['browser'])) ? $search['browser'] : ''; ?>" placeholder="<?php echo $welcome->loadPo('Browser') ?>">
                                            </div>
                                        </div>                                     
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-lg-4">
                                            <div class="input text">
                                                <label for="url"><?php echo $welcome->loadPo('Start Date') ?></label>
                                                <input type="text" class="form-control datepicker"  id="startdate" name="startdate" placeholder="<?php echo $welcome->loadPo('Start Date') ?>" value="<?php echo (isset($search['startdate'])) ? $search['startdate'] : ''; ?>" >											
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <div class="input text">
                                                <label for="url"><?php echo $welcome->loadPo('End Date') ?></label>
                                                <input type="text" class="form-control datepicker"  id="enddate" name="enddate" placeholder="<?php echo $welcome->loadPo('End Date') ?>" value="<?php echo (isset($search['enddate'])) ? $search['enddate'] : ''; ?>">
                                            </div>
                                        </div>
                                    </div>
                                </div><!-- /.box-body -->
                                <div class="box-footer" style="display:none;">
                                        <!--	<input type="text" id="hddstarddt" name="hddstarddt" value="<?php echo @$_POST['hddstarddt'] ?>"> -->
                                    <button type="submit" name="search" value="Search"class="btn btn-primary"><?php echo $welcome->loadPo('Search') ?></button>
                                    <button type="submit" name="reset" value="Reset"class="btn btn-primary"><?php echo $welcome->loadPo('Reset') ?></button>
                                </div>
                        </div><!-- /.box -->
                    </div><!--/.col (left) -->
                </div>
                </form>    
              
        <!-- Small boxes (Stat box) -->
	
        <div class="row">
            
            <div class="col-lg-2 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-light-blue">
                    <div class="inner">
                        <h3>
                            <?php echo $summary->total_hits;?>	
                        </h3>
                        <p>
                           <?php echo $welcome->loadPo('Total Impressions'); ?> 
                        </p>
                    </div>
                   
                    <!--a href="<?php //echo base_url() ?>video" class="small-box-footer">
                        <?php //echo $welcome->loadPo('More info'); ?> <i class="fa fa-arrow-circle-right"></i>
                    </a>-->
                </div>
            </div>
	    <div class="col-lg-2 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-green">
                    <div class="inner">
                        <h3>
                            <?php echo $summary->unique_hits;?>	
                        </h3>
                        <p>
                           <?php echo $welcome->loadPo('Unique Users'); ?> 
                        </p>
                    </div>
                   
                    <!--a href="<?php //echo base_url() ?>video" class="small-box-footer">
                        <?php //echo $welcome->loadPo('More info'); ?> <i class="fa fa-arrow-circle-right"></i>
                    </a>-->
                </div>
            </div>
                                   
            <div class="col-lg-2 col-xs-6">
                <!-- small box -->
                <div class="small-box bg-purple">
                    <div class="inner">
                        <h3>
                            <?php echo time_from_seconds($summary->total_watched_time); //-- common helper ?>
                       
                        </h3>
                        <p>
                            <?php echo $welcome->loadPo('Total Time Watched'); ?>
                        </p>
                    </div>
                   
                    <!--a href="#" class="small-box-footer">
                        <?php //echo $welcome->loadPo('More info'); ?> <i class="fa fa-arrow-circle-right"></i>
                    </a>-->
                </div>
            </div><!-- ./col -->
        </div><!-- /.row -->
        <div class="col-md-3 col-sm-4">
            Export
        <a target='_blank' href='<?php echo base_url()?>ads_analytics/export/r/pdf/<?php echo $sort_i;?>/<?php echo $sort_by;?>/type/usercontent/id/<?php echo $userid;?>'  title='pdf'><i class="fa fa-fw fa-file-text-o"></i></a>
        <a target='_blank' href='<?php echo base_url()?>ads_analytics/export/r/csv/<?php echo $sort_i;?>/<?php echo $sort_by;?>/type/usercontent/id/<?php echo $userid;?>' title='csv'><i class="fa fa-fw fa-list-alt"></i></a>
        </div>     
                <div class="row">
                    <div class="col-xs-12">
                        <div class="box">
                            <div class="box-body table-responsive">
                                <table id="example2" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/v/<?php echo (!empty($show_c)) ? $show_c : 'asc'; ?>/id/<?php echo $userid;?>">Campaigns</a></th>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/p/<?php echo (!empty($show_p)) ? $show_p : 'asc'; ?>/id/<?php echo $userid;?>">Advertiser</a></th>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/os/<?php echo (!empty($show_os)) ? $show_os : 'asc'; ?>/id/<?php echo $userid;?>">Platform</a></th>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/brw/<?php echo (!empty($show_brw)) ? $show_brw : 'asc'; ?>/id/<?php echo $userid;?>">Browser</a></th>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/loc/<?php echo (!empty($show_loc)) ? $show_loc : 'asc'; ?>/id/<?php echo $userid;?>">Location</a></th>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/dt/<?php echo (!empty($show_dt)) ? $show_dt : 'asc'; ?>/id/<?php echo $userid;?>">Date</a></th>
					    <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/h/<?php echo (!empty($show_h)) ? $show_h : 'asc'; ?>/id/<?php echo $userid;?>">Total Impressions</a></th>
                                            <th><a href="<?php echo base_url(); ?>ads_analytics/usercontent/t/<?php echo (!empty($show_t)) ? $show_t : 'asc'; ?>/id/<?php echo $userid;?>">Total Time Watched</a></th>	
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <?php foreach ($content as $value) { ?>
                                        <tr id="<?php echo $value->id ?>">
                                                <td  width="70%"><!--a href="<?php echo base_url(); ?>ads_analytics/user/<?php echo $value->id; ?>"--><?php echo $value->ad_title; ?></td>
                                                <td><?php echo $value->content_provider; ?></td>                                                
                                                <td><?php echo $value->platform; ?></td>                                                
                                                <td><?php echo $value->browser; ?></td>
                                                <td><?php echo $value->country; ?></td>                                                
                                                <td><?php echo $value->created; ?></td>
						<td><?php echo $value->total_hits; ?></td>
                                                <td><?php echo time_from_seconds($value->total_watched_time); ?></td>                                                                                        
                                            </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                                <!-- Pagination start --->
                                <?php
                                if ($this->pagination->total_rows == '0') {
                                    echo "<tr><td colspan=\"7\"><h4>" . $welcome->loadPo('No Record Found') . "</td></tr></h4>";
                                } else {
                                    ?>
                                    </table>

                                    <div class="row pull-left">
                                        <div class="dataTables_info" id="example2_info"><br>
                                            <?php
                                            $param = $this->pagination->cur_page * $this->pagination->per_page;
                                            if ($param > $this->pagination->total_rows) {
                                                $param = $this->pagination->total_rows;
                                            }
                                            if ($this->pagination->cur_page == '0') {
                                                $param = $this->pagination->total_rows;
                                            }
                                            $off = $this->pagination->cur_page;
                                            if ($this->pagination->cur_page > '1') {
                                                $off = (($this->pagination->cur_page * '10') - 9);
                                            }
                                            echo "&nbsp;&nbsp;Showing <b>" . $off . "-" . $param . "</b> of <b>" . $this->pagination->total_rows . "</b> total results";
                                        }
                                        ?>
                                    </div>
                                </div>	
                                <div class="row pull-right">
                                    <div class="col-xs-12">
                                        <div class="dataTables_paginate paging_bootstrap">
                                            <ul class="pagination"><li><?php echo $welcome->loadPo($links); ?></li></ul> 
                                        </div>
                                    </div>
                                </div>
                            </div>		
                            <!-- Pagination end -->
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
            </div>
            </div>
        </section><!-- /.content -->
    </aside><!-- /.right-side -->
<!--/div--><!-- ./wrapper -->
 <script>

  $(function(){
     $( ".datepicker" ).datepicker({
  dateFormat: 'dd-mm-yy',
  numberOfMonths: 1,
});

//-- auto suggest bootstrap-typeahead --//
    $('#country').typeahead({
        source: <?php echo (json_encode($country));?>
        //itemSelected: displayResult
    });
  });
 
  </script>